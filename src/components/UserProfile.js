import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { updateUserProfile, getCurrentUser } from "../services/api";

const UserProfile = () => {
  const { accessToken } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getCurrentUser(accessToken);
        console.log("User profile data:", response); // Ensure the response is logged
        setUsername(response.username || ""); // Set username from response
        setEmail(response.email || ""); // Set email from response
      } catch (err) {
        setError("Failed to fetch user profile.");
        console.error("Fetch error:", err); // Log the error
      }
    };

    if (accessToken) {
      // Ensure the token exists before fetching
      fetchUserProfile();
    }
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ username, email, password }, accessToken);
      setMessage("Profile updated successfully!");
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update profile.");
      setMessage("");
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
            onChange={(e) => setUsername(e.target.value || "")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value || "")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value || "")}
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
