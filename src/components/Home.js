import React from "react";
import { Box, Heading, Text, VStack, SimpleGrid, Icon } from "@chakra-ui/react";
import { MdContactPhone, MdAdd, MdEdit, MdDelete } from "react-icons/md"; // Ensure this import is correct

const Home = () => {
  return (
    <Box
      position="relative"
      minH="100vh"
      p={5}
      bgColor="gray.700" // Set the background color to black with some transparency
      color="white"
    >
      {/* Overlay Box */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgColor="blackAlpha.600" // Keep the overlay for contrast
        zIndex="0"
      />

      <Box
        zIndex="1"
        maxW="800px"
        mx="auto"
        textAlign="left"
        position="relative"
      >
        <VStack spacing={4} align="flex-start">
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="white" // Changed to white for contrast
          >
            Welcome to the Contact Manager
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color="white" // Changed to white for contrast
          >
            Manage your contacts easily and efficiently. Keep track of your
            friends, family, and colleagues in one place. Easily add, edit, and
            delete contacts. Search and filter contacts by name, email, or phone
            number.
          </Text>
        </VStack>

        {/* Functionality Boxes */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mt={10}>
          <Box
            p={5}
            borderRadius="md"
            bg="gray.700"
            color="white"
            textAlign="center"
          >
            <Icon as={MdAdd} boxSize={8} mb={3} />
            <Heading size="md">Add Contacts</Heading>
            <Text mt={2}>
              Easily add new contacts to your list with just a few clicks.
            </Text>
          </Box>
          <Box
            p={5}
            borderRadius="md"
            bg="gray.700"
            color="white"
            textAlign="center"
          >
            <Icon as={MdEdit} boxSize={8} mb={3} />
            <Heading size="md">Edit Contacts</Heading>
            <Text mt={2}>
              Update contact information whenever necessary to keep it current.
            </Text>
          </Box>
          <Box
            p={5}
            borderRadius="md"
            bg="gray.700"
            color="white"
            textAlign="center"
          >
            <Icon as={MdDelete} boxSize={8} mb={3} />
            <Heading size="md">Delete Contacts</Heading>
            <Text mt={2}>
              Remove contacts that you no longer need from your list.
            </Text>
          </Box>
          <Box
            p={5}
            borderRadius="md"
            bg="gray.700"
            color="white"
            textAlign="center"
          >
            <Icon as={MdContactPhone} boxSize={8} mb={3} />
            <Heading size="md">Search Contacts</Heading>
            <Text mt={2}>
              Quickly find contacts by searching their name, email, or phone
              number.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
