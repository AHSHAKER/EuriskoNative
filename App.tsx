import React from 'react';
import {ThemeProvider} from './src/context/ThemeContext';
import AppNavigation from './src/navigator/AppNavigation';
import {enableScreens} from 'react-native-screens';
enableScreens();

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
