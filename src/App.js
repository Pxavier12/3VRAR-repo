import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Image,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { HomeContainer } from './pages/Home';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Box paddingTop="10" textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          <VStack spacing={8}>
            <HomeContainer />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
