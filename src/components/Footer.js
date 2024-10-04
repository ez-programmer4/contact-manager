import React from "react";
import { Box, Text, Stack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py={4}
      textAlign="center"
      position="relative"
      bottom="0"
      width="100%"
    >
      <Stack spacing={1}>
        <Text fontSize="sm">© {new Date().getFullYear()} Contact Manager</Text>
        <Text fontSize="sm">All rights reserved. |</Text>
        <Text fontSize="sm">Created by Ezedin - Full Stack Developer</Text>
        <Text fontSize="sm">
          Connect with me:{" "}
          <a
            href="mailto:ezedinebrahim131@gmail.com"
            style={{ color: "white", textDecoration: "underline" }}
          >
            ezedinebrahim131@gmail.com
          </a>
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;
