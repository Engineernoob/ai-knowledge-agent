// src/theme.d.ts
import 'styled-components';
import { Theme as ChakraTheme } from '@chakra-ui/react';

declare module 'styled-components' {
  export interface DefaultTheme extends ChakraTheme {}
}