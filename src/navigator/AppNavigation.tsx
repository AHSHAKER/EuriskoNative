import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuthStore} from '../store/AuthStore';
import AuthStackNavigator from './AuthStackNavigator';
import MainTabNavigator from './MainTabNavigator';

const linking = {
  prefixes: ['hzero://'],
  config: {
    screens: {
      Products: {
        screens: {
          ProductList: 'products',
          ProductDetails: 'product/:productId',
        },
      },
      Profile: 'profile',
    },
  },
};

function AppNavigation() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigation;
