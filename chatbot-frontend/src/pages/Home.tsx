import React from 'react';
import { Box, Button, Container, Heading, Image, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('black', 'white');
  const buttonBg = useColorModeValue('teal.500', 'teal.300');
  const buttonColor = useColorModeValue('white', 'black');

  return (
    <Container maxW="xl" textAlign="center" py={10} bg={bg} color={color} borderRadius="md" boxShadow="lg">
      <Image src="/ai-bot-logo.jpg" alt="AI Bot Logo" boxSize="150px" mb={4} />
      <Heading as="h1" size="xl" mb={6} color={buttonBg}>
        AI Chatbot
      </Heading>
      <Box>
        <Button as={Link} to="/ask" bg={buttonBg} color={buttonColor} _hover={{ bg: useColorModeValue('teal.600', 'teal.400') }} mr={4}>
          Go to Ask
        </Button>
        
      </Box>
    </Container>
  );
};

export default Home;