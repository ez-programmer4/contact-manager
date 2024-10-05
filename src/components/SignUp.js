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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://contact-manager-api-u2qo.onrender.com/api/user/signup",
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

      setSuccessMessage("Account created successfully!");
      toast({
        title: "Success!",
        description: "Account created successfully. Please sign in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/signin"); // Redirect to sign-in page after successful signup
    } catch (error) {
      setError(error.response?.data?.message || "Sign up failed");
      toast({
        title: "Error signing up.",
        description: error.response?.data?.message || "Please try again.",
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
            Sign Up
          </Heading>
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              {successMessage}
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
            Sign Up
          </Button>
        </VStack>
        <Text mt={4} textAlign="center" color="whiteAlpha.800">
          Already have an account?{" "}
          <Button variant="link" colorScheme="blue" as={Link} to="/signin">
            Sign In
          </Button>
        </Text>
      </Box>
    </Box>
  );
};

export default SignUp;
