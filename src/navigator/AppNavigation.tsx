import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuthStore} from '../store/AuthStore';
import AuthStackNavigator from './AuthStackNavigator';
import MainTabNavigator from './MainTabNavigator';

function AppNavigation() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigation;
