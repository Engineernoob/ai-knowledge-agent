import React from 'react';
import { ChakraProvider, Box, VStack, HStack, IconButton, useColorMode, ColorModeScript, extendTheme, ThemeConfig } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaComments } from 'react-icons/fa';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Home from './pages/Home';
import Ask from './pages/Ask';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    dark: {
      50: '#e6e6e6',
      100: '#b3b3b3',
      200: '#808080',
      300: '#4d4d4d',
      400: '#1a1a1a',
      500: '#0d0d0d',
      600: '#0b0b0b',
      700: '#080808',
      800: '#050505',
      900: '#020202',
    },
  },
});

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Box display="flex" height="100vh">
          <Box
            as="nav"
            width="250px"
            bg={colorMode === 'dark' ? 'dark.800' : 'gray.100'}
            color={colorMode === 'dark' ? 'white' : 'black'}
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
          >
            <VStack spacing={4}>
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
                mb={4}
              />
              <Link to="/">
                <HStack>
                  <IconButton aria-label="Home" icon={<FaHome />} variant="ghost" />
                  <Box as="span">Home</Box>
                </HStack>
              </Link>
              <HStack>
                <IconButton aria-label="Chat" icon={<FaComments />} variant="ghost" />
                <Box as="span">Chat (Coming Soon)</Box>
              </HStack>
              <Link to="/ask">
                <HStack>
                  <IconButton aria-label="Ask" icon={<FaComments />} variant="ghost" />
                  <Box as="span">Ask</Box>
                </HStack>
              </Link>
            </VStack>
          </Box>
          <Box flex="1" p={6} bg={colorMode === 'dark' ? 'dark.900' : 'white'}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ask" element={<Ask />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;