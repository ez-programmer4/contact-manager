// src/components/CreateContact.js
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";
import { createContact } from "../services/api";

const CreateContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      await createContact({ name, email, phone });
      setSuccess("Contact added successfully!");
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setError("Failed to add contact. Please try again.");
    }
  };

  return (
    <Box
      p={5}
      bg="gray.800"
      borderRadius="md"
      color="white"
      maxWidth="400px"
      mx="auto"
      mt={10}
    >
      <Heading size="lg" mb={4} textAlign="center">
        Add New Contact
      </Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {success && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {success}
        </Alert>
      )}
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg="gray.700"
            color="white"
            borderColor="whiteAlpha.600"
            _placeholder={{ color: "whiteAlpha.600" }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="gray.700"
            color="white"
            borderColor="whiteAlpha.600"
            _placeholder={{ color: "whiteAlpha.600" }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Phone</FormLabel>
          <Input
            type="tel"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            bg="gray.700"
            color="white"
            borderColor="whiteAlpha.600"
            _placeholder={{ color: "whiteAlpha.600" }}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Add Contact
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateContact;
