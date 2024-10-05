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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://contact-manager-api-3.onrender.com/api/contacts",
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard"); // Redirect after successful addition
    } catch (error) {
      console.error("Error adding contact:", error.response.data);
      setError(error.response?.data?.message || "Failed to add contact"); // Set error message
    }
  };

  return (
    <Box
      p={{ base: 5, md: 8 }} // Responsive padding
      minH="100vh"
      bg="black" // Set background color to black
      color="white" // Set text color to white
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width={{ base: "90%", sm: "400px", md: "500px" }} // Responsive width
        bg="gray.800" // Dark background for the form
        borderRadius="md"
        boxShadow="lg"
        p={6}
      >
        <VStack spacing={4} align="start">
          <Heading>Add New Contact</Heading>
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormControl as="form" onSubmit={handleSubmit} mt={4}>
            <FormLabel color="whiteAlpha.800">Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
              variant="outline"
              _placeholder={{ color: "whiteAlpha.600" }} // Placeholder color
              borderColor="whiteAlpha.600" // Border color for input
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
            />
            <FormLabel mt={4} color="whiteAlpha.800">
              Email
            </FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email"
              required
              variant="outline"
              _placeholder={{ color: "whiteAlpha.600" }} // Placeholder color
              borderColor="whiteAlpha.600" // Border color for input
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
            />
            <FormLabel mt={4} color="whiteAlpha.800">
              Phone
            </FormLabel>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone"
              required
              variant="outline"
              _placeholder={{ color: "whiteAlpha.600" }} // Placeholder color
              borderColor="whiteAlpha.600" // Border color for input
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
            />
            <Button mt={4} colorScheme="teal" type="submit" width="full">
              Add Contact
            </Button>
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddContact;
