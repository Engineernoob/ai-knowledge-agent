import { useState } from 'react';
import { Box, Heading, Text, Input, Button, VStack, HStack, Spinner, Fade } from '@chakra-ui/react';
import axios from 'axios';

const Ask: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (question.trim() === '') return;
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/ask', { question });
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
    }
    setLoading(false);
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2} color="teal.500">
        Ask a Question
      </Heading>
      <VStack mt={4} spacing={4}>
        <HStack>
          <Input
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            size="lg"
            boxShadow="md"
          />
          <Button colorScheme="teal" onClick={handleAsk} size="lg" boxShadow="md">
            {loading ? <Spinner /> : 'Ask'}
          </Button>
        </HStack>
        {response && (
          <Fade in={true}>
            <Box p={4} bg="gray.100" borderRadius="md" mt={4} boxShadow="md">
              <Text>{response}</Text>
            </Box>
          </Fade>
        )}
      </VStack>
    </Box>
  );
};

export default Ask;