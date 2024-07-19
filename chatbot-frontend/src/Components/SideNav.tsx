import React from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Text, HStack } from '@chakra-ui/react';
import { FaHome, FaComments } from 'react-icons/fa';

const SideNav: React.FC = () => {
  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      height="100vh"
      width="200px"
      bg="gray.900"
      color="white"
      p={4}
    >
      <VStack spacing={8} align="stretch">
        <Text fontSize="2xl" mb={6} textAlign="center" fontWeight="bold">
          AI Chatbot
        </Text>
        <Link to="/">
          <HStack spacing={4} align="center">
            <FaHome />
            <Text fontSize="xl" _hover={{ color: 'teal.300' }}>
              Home
            </Text>
          </HStack>
        </Link>
        <Link to="/chat">
          <HStack spacing={4} align="center">
            <FaComments />
            <Text fontSize="xl" _hover={{ color: 'teal.300' }}>
              Chat
            </Text>
          </HStack>
        </Link>
      </VStack>
    </Box>
  );
};

export default SideNav;