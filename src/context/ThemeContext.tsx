import React, {createContext, useState, useContext} from 'react';

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  header: '#f2f2f2',
  card: '#e0e0e0',
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
  header: '#1c1c1e',
  card: '#2c2c2c',
};

const ThemeContext = createContext({
  dark: false,
  toggleTheme: () => {},
  theme: lightTheme,
});

export const ThemeProvider = ({children}: any) => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark(prev => !prev);

  const theme = dark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{dark, toggleTheme, theme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
