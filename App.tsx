import React, {use} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/AuthScreens/SignUpScreen';
import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import OTPScreen from './src/screens/AuthScreens/OTPScreen';
import ProductListScreen from './src/screens/AppScreens/ProductListScreen';
import ProductDetailsScreen from './src/screens/AppScreens/ProductDetailsScreen';
import type {
  MainStackParamList,
  AuthStackParamList,
} from './src/navigator/Types';
import {AuthProvider, useAuth} from './src/context/AuthContext';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="OTP" component={OTPScreen} />
    </AuthStack.Navigator>
  );
}

function MainStackNavigator() {
  const {theme} = useTheme();
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.header,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Products',
        }}
      />
      <MainStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}

function AppNavigation() {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {!isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </ThemeProvider>
  );
}
