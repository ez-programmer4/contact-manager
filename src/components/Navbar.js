import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Spacer, Heading } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext"; // Import the Auth context

const Navbar = () => {
  const { accessToken, logout } = useAuth(); // Use the Auth context
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/"); // Redirect to homepage after logout
  };

  const isLoggedIn = Boolean(accessToken); // Check if the user is logged in

  return (
    <Box bg="blue.500" p={4}>
      <Flex alignItems="center">
        <Heading size="md" color="white" mr={8}>
          Contact Manager
        </Heading>
        <Spacer />
        {!isLoggedIn ? (
          <>
            <Link to="/signin">
              <Button colorScheme="teal" variant="outline" mr={4}>
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="teal" variant="solid">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
