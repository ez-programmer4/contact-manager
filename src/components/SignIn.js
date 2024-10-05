import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Alert,
  AlertIcon,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth(); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://contact-manager-api-3.onrender.com/api/user/login", // Updated URL
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure the correct content type
          },
        }
      );
      login(response.data.accessToken); // Call the login function
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Sign in failed");
      toast({
        title: "Error signing in.",
        description:
          error.response?.data?.message ||
          "Please check your email and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      p={5}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="black"
    >
      <Box
        p={8}
        borderRadius="md"
        boxShadow="lg"
        bg="gray.800"
        width={{ base: "90%", sm: "400px" }}
      >
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading textAlign="center" color="white">
            Sign In
          </Heading>
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormControl isRequired>
            <FormLabel color="whiteAlpha.800">Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outline"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="whiteAlpha.800">Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outline"
            />
          </FormControl>
          <Button mt={4} colorScheme="blue" type="submit" width="full">
            Sign In
          </Button>
        </VStack>
        <Text mt={4} textAlign="center" color="whiteAlpha.800">
          Don't have an account?{" "}
          <Button variant="link" colorScheme="blue" as={Link} to="/signup">
            Sign Up
          </Button>
        </Text>
      </Box>
    </Box>
  );
};

export default SignIn;
