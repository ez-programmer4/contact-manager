import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import ContactList from "./ContactList";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://contact-manager-api-htug.onrender.com/api/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContacts(response.data);
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

  return (
    <Box p={{ base: 4, md: 5 }} minH="100vh" bg="black" color="white">
      <VStack spacing={4} align="start">
        <Heading size="lg" color="teal.500">
          Dashboard
        </Heading>
        <Button as={Link} to="/add" colorScheme="teal" mb={4}>
          Add Contact
        </Button>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {loading ? (
          <Box color="white" display="flex" alignItems="center">
            <Spinner size="lg" color="teal.500" />
            <Box ml={4}>Loading contacts...</Box>
          </Box>
        ) : (
          <ContactList
            contacts={contacts}
            setContacts={setContacts}
            fetchContacts={fetchContacts} // Keep this if you want to pass it down for importing
          />
        )}
      </VStack>
    </Box>
  );
};

export default Dashboard;
