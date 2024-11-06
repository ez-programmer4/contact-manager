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
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://contact-manager-api-htug.onrender.com/api/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      login(response.data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Sign in failed";
      setError(errorMessage);
      toast({
        title: "Error signing in.",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
              color="white"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="whiteAlpha.800">Password</FormLabel>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outline"
              color="white"
            />
            <Button
              mt={2}
              onClick={() => setShowPassword(!showPassword)}
              variant="link"
              colorScheme="blue"
            >
              {showPassword ? "Hide" : "Show"} Password
            </Button>
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            width="full"
            isLoading={loading} // Show loading state
            isDisabled={loading} // Disable button when loading
          >
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
