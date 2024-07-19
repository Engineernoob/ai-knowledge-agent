import React from 'react';
import { Box, Container, Text, VStack } from '@chakra-ui/react';

const Chat: React.FC = () => {
  return (
    <Container maxW="md" mt={4}>
      <VStack spacing={4} align="center" justify="center" height="60vh">
        <Box bg="gray.100" p={4} borderRadius="md" boxShadow="md" textAlign="center">
          <Text fontSize="lg" color="gray.600">Oh, Sorry I am coming soon!</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Chat;