// src/components/NotFound.js

import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      p={5}
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="black"
    >
      <Heading color="white">404 - Not Found</Heading>
      <Text color="whiteAlpha.800" mt={4}>
        The page you are looking for does not exist.
      </Text>
      <Button mt={4} colorScheme="blue" as={Link} to="/">
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
