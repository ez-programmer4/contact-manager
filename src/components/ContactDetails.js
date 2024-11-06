// src/components/ContactDetails.js

import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const ContactDetails = ({ contact, onClose }) => {
  return (
    <Box p={4} bg="gray.600" borderRadius="md" marginTop={10}>
      <Heading size="sm">Details:</Heading>
      <Text>Name: {contact.name}</Text>
      <Text>Email: {contact.email}</Text>
      <Text>Phone: {contact.phone}</Text>
      <Text>Group: {contact.group}</Text> {/* Display group */}
      <Button mt={2} colorScheme="blue" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default ContactDetails;
