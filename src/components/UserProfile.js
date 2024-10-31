// src/components/UserProfile.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/api"; // Add this to your API service

const UserProfile = () => {
  const { accessToken } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data here
    const fetchUserProfile = async () => {
      const response = await getCurrentUser(); // Implement this function in your API service
      setUsername(response.username);
      setEmail(response.email);
    };
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ username, email, password }, accessToken);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <Box p={5}>
      <Heading>User Profile</Heading>
      {message && <Alert status="success">{message}</Alert>}
      {error && <Alert status="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Update Profile
        </Button>
      </form>
    </Box>
  );
};

export default UserProfile;
