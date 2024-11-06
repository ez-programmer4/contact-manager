// src/components/EditContact.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    group: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get(
          `https://contact-manager-api-htug.onrender.com/api/contacts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
        setContact(response.data);
      } catch (err) {
        console.error("Error fetching contact:", err);
        setError("Failed to fetch contact. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token for update request
      await axios.put(`http://localhost:3001/api/contacts/${id}`, contact, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
      navigate("/dashboard"); // Redirect to dashboard after editing
    } catch (err) {
      console.error("Error updating contact:", err);
      setError("Failed to update contact. Please try again.");
    }
  };

  if (loading) {
    return <Spinner size="xl" color="teal.500" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon /> {error}
      </Alert>
    );
  }

  return (
    <Box p={5} bg="gray.800" borderRadius="md" color="white">
      <Heading size="lg" mb={4}>
        Edit Contact
      </Heading>
      <VStack as="form" onSubmit={handleSubmit} spacing={4} align="start">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Name</FormLabel>
          <Input
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
            bg="gray.700"
            color="white"
            borderColor="whiteAlpha.600"
            _placeholder={{ color: "whiteAlpha.600" }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Email</FormLabel>
          <Input
            type="email" // Ensure valid email format
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
            bg="gray.700"
            color="white"
            borderColor="whiteAlpha.600"
            _placeholder={{ color: "whiteAlpha.600" }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Phone</FormLabel>
          <Input
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            required
            bg="gray.700"
            color="white"
            borderColor="whiteAlpha.600"
            _placeholder={{ color: "whiteAlpha.600" }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Group</FormLabel>
          <Select
            value={contact.group}
            onChange={(e) => setContact({ ...contact, group: e.target.value })}
            bg="gray.700"
            color="white"
            borderColor="whiteAlpha.600"
          >
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Colleagues">Colleagues</option>
            <option value="">Select Group</option>
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Update Contact
        </Button>
      </VStack>
    </Box>
  );
};

export default EditContact;
