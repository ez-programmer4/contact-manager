// src/components/AddContact.js
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { createContact } from "../services/api";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("");
  const toast = useToast(); // For displaying notifications

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact({ name, email, phone, group });
      toast({
        title: "Contact Added",
        description: "Contact has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Clear the form fields
      setName("");
      setEmail("");
      setPhone("");
      setGroup("");
    } catch (error) {
      toast({
        title: "Error adding contact",
        description: error.response?.data?.message || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone</FormLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Group</FormLabel>
          <Select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="">Select Group</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Colleagues">Colleagues</option>
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Add Contact
        </Button>
      </form>
    </Box>
  );
};

export default AddContact;
