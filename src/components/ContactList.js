import React, { useState } from "react";
import {
  Box,
  Button,
  Alert,
  AlertIcon,
  Heading,
  Grid,
  GridItem,
  Input,
  HStack,
  Select,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import icons for favorites
import DeleteContact from "./DeleteContact";
import ContactDetails from "./ContactDetails";
import { toggleFavoriteContact } from "../services/api"; // Import the toggleFavoriteContact function

const ContactList = ({ contacts, setContacts }) => {
  const [error, setError] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(""); // State for contact groups
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
  };

  const cancelDelete = () => {
    setContactToDelete(null);
  };

  const filteredContacts = contacts.filter((contact) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lowerCaseTerm) &&
      (selectedGroup ? contact.group === selectedGroup : true) // Filter by group if selected
    );
  });

  const sortedContacts = filteredContacts.sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "email") {
      return a.email.localeCompare(b.email);
    } else {
      return a.phone.localeCompare(b.phone);
    }
  });

  const toggleFavorite = async (id, isFavorite) => {
    try {
      const updatedContact = await toggleFavoriteContact(id, {
        favorite: !isFavorite,
      });
      setContacts((prev) =>
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
    <Box p={5} bg="gray.800" borderRadius="md" color="white">
      <Heading size="lg" mb={4}>
        Contact List
      </Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon /> {error}
        </Alert>
      )}
      <HStack mb={4} spacing={4} width="100%">
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="gray.700"
          color="white"
          borderColor="whiteAlpha.600"
          _placeholder={{ color: "whiteAlpha.600" }}
          flex="1"
        />
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          bg="gray.700"
          color="white"
          borderColor="whiteAlpha.600"
          width="auto"
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="phone">Sort by Phone</option>
        </Select>
        <Select
          placeholder="Filter by Group"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          bg="gray.700"
          color="white"
          borderColor="whiteAlpha.600"
          width="auto"
        >
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Colleagues">Colleagues</option>
          {/* Add more groups as needed */}
        </Select>
      </HStack>
      {sortedContacts.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          No contacts found.
        </Alert>
      ) : (
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
          gap={4}
        >
          {sortedContacts.map((contact) => (
            <GridItem
              key={contact._id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg="gray.700"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              overflow="hidden"
            >
              <Box isTruncated>
                {contact.name} - {contact.email} - {contact.phone}
              </Box>
              <HStack>
                <Icon
                  as={contact.favorite ? FaStar : FaRegStar}
                  color={contact.favorite ? "yellow.400" : "gray.400"}
                  cursor="pointer"
                  onClick={() => toggleFavorite(contact._id, contact.favorite)}
                />
                <Button
                  onClick={() => setSelectedContact(contact)}
                  colorScheme="teal"
                  ml={2}
                >
                  Show Details
                </Button>
                <Button
                  onClick={() => navigate(`/edit/${contact._id}`)}
                  colorScheme="blue"
                  ml={2}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(contact._id)}
                  colorScheme="red"
                  ml={2}
                >
                  Delete
                </Button>
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
    </Box>
  );
};

export default ContactList;
