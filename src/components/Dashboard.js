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
} from "@chakra-ui/react";
import ContactList from "./ContactList"; // Import the ContactList component

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading status

  const fetchContacts = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(""); // Clear previous errors
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://contact-manager-apii.onrender.com/api/contacts",
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
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Box
      p={5}
      minH="100vh"
      bg="black" // Set background to black
      color="white" // Set text color to white
    >
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
          <Box color="white">Loading contacts...</Box> // Loading state
        ) : (
          <ContactList contacts={contacts} setContacts={setContacts} />
        )}
      </VStack>
    </Box>
  );
};

export default Dashboard;
