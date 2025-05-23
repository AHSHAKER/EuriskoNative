import React from 'react';
import {ThemeProvider} from './src/context/ThemeContext';
import AppNavigation from './src/navigator/AppNavigation';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
