import React, {use, useEffect} from 'react';
import {ThemeProvider} from './src/context/ThemeContext';
import AppNavigation from './src/navigator/AppNavigation';
import {enableScreens} from 'react-native-screens';
import BootSplash from 'react-native-bootsplash';
enableScreens();

export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
