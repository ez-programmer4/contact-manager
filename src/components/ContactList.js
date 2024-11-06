import React, { useEffect, useState } from "react";
import {
  Box,
  Alert,
  AlertIcon,
  Heading,
  Grid,
  GridItem,
  Select,
  HStack,
  Icon,
  Checkbox,
  Stack,
  Button,
  Flex,
  Spinner,
  Input, // Import Input for search
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteContact from "./DeleteContact";
import ContactDetails from "./ContactDetails";
import { toggleFavoriteContact } from "../services/api";
import axios from "axios";

const ContactList = ({ setContacts }) => {
  const [contacts, setContactsLocal] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const navigate = useNavigate();

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContactsLocal(response.data);
      setContacts(response.data);
      console.log("Fetched Contacts:", response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to load contacts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
  };

  const cancelDelete = () => {
    setContactToDelete(null);
  };

  const clearFilters = () => {
    setSelectedGroup("");
    setSelectedContacts([]);
    setSearchTerm(""); // Clear search term
  };

  // Filter contacts based on selected group and search term
  const filteredContacts = contacts.filter((contact) => {
    if (!contact) {
      console.log("Skipped undefined contact");
      return false;
    }

    // Check if the contact matches the selected group
    const matchesGroup =
      !selectedGroup ||
      contact.group.toLowerCase() === selectedGroup.toLowerCase();

    // Check if the contact name matches the search term
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesGroup && matchesSearch;
  });

  const sortedContacts = filteredContacts.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const toggleFavorite = async (id, isFavorite) => {
    try {
      await toggleFavoriteContact(id, { favorite: !isFavorite });
      setContactsLocal((prev) =>
        prev.map((contact) =>
          contact._id === id ? { ...contact, favorite: !isFavorite } : contact
        )
      );
    } catch (error) {
      setError("Failed to update favorite status.");
    }
  };

  if (!Array.isArray(contacts)) {
    console.error("Contacts prop is not an array:", contacts);
    return (
      <Alert status="error">
        <AlertIcon /> Contacts data is not available.
      </Alert>
    );
  }

  return (
    <Box p={5} bg="gray.800" borderRadius="md" color="white" width="100%">
      <Heading size="lg" mb={4}>
        Contact List
      </Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon /> {error}
        </Alert>
      )}
      {success && (
        <Alert status="success" mb={4}>
          <AlertIcon /> {success}
        </Alert>
      )}

      {loading ? (
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Spinner size="xl" color="teal.400" />
        </Flex>
      ) : (
        <>
          {/* Search Input */}
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="gray.700"
              color="white"
              borderColor="blackAlpha.600"
              width="auto"
            />
            {/* Filter by Group */}
            <Select
              placeholder="Filter by Group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              bg="gray.700"
              color="white"
              borderColor="blackAlpha.600"
              width="auto"
            >
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Colleagues">Colleagues</option>
            </Select>
            <Button onClick={clearFilters} colorScheme="red">
              Clear Filters
            </Button>
          </HStack>

          {filteredContacts.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No contacts found for the selected group or search term.
            </Alert>
          ) : (
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(auto-fill, minmax(250px, 1fr))",
              }}
              gap={4}
            >
              {sortedContacts.map((contact) => (
                <GridItem
                  key={contact._id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg="gray.700"
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <Checkbox
                      size="sm"
                      colorScheme="teal"
                      isChecked={selectedContacts.includes(contact)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedContacts((prev) => [...prev, contact]);
                        } else {
                          setSelectedContacts((prev) =>
                            prev.filter((c) => c._id !== contact._id)
                          );
                        }
                      }}
                    />
                    <Box isTruncated>{contact.name}</Box>
                    <HStack spacing={4}>
                      <Icon
                        as={contact.favorite ? FaStar : FaRegStar}
                        color={contact.favorite ? "yellow.400" : "gray.400"}
                        cursor="pointer"
                        onClick={() =>
                          toggleFavorite(contact._id, contact.favorite)
                        }
                      />
                      <Icon
                        as={FaEye}
                        color="blue.400"
                        cursor="pointer"
                        onClick={() => setSelectedContact(contact)}
                      />
                      <Icon
                        as={FaEdit}
                        color="green.400"
                        cursor="pointer"
                        onClick={() => navigate(`/edit/${contact._id}`)}
                      />
                      <Icon
                        as={FaTrash}
                        color="red.400"
                        cursor="pointer"
                        onClick={() => handleDeleteClick(contact._id)}
                      />
                    </HStack>
                  </HStack>
                </GridItem>
              ))}
            </Grid>
          )}

          {contactToDelete && (
            <DeleteContact
              contactId={contactToDelete}
              setContacts={setContacts}
              onCancel={cancelDelete}
            />
          )}
          {selectedContact && (
            <ContactDetails
              contact={selectedContact}
              onClose={() => setSelectedContact(null)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ContactList;
