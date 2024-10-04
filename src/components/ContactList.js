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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DeleteContact from "./DeleteContact";
import ContactDetails from "./ContactDetails";

const ContactList = ({ contacts, setContacts }) => {
  const [error, setError] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
  };

  const cancelDelete = () => {
    setContactToDelete(null);
  };

  const filteredContacts = contacts.filter((contact) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return contact.name.toLowerCase().includes(lowerCaseTerm); // Filter only by name
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
                {/* Trigger the delete confirmation dialog */}
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
