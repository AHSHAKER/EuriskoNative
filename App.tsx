import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/AuthScreens/SignUpScreen';
import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import OTPScreen from './src/screens/AuthScreens/OTPScreen';
import DoneScreen from './src/screens/Done';
import ProductListScreen from './src/screens/AppScreens/ProductListScreen';
import ProductDetailsScreen from './src/screens/AppScreens/ProductDetailsScreen';
import type {
  MainStackParamList,
  AuthStackParamList,
} from './src/navigator/Types';
import {AuthProvider, useAuth} from './src/context/AuthContext';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="OTP" component={OTPScreen} />
      <AuthStack.Screen name="Done" component={DoneScreen} />
    </AuthStack.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="ProductList" component={ProductListScreen} />
      <MainStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
    </MainStack.Navigator>
  );
}

function AppNavigation() {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
