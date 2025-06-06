import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {AuthStackParamList} from './Types';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';
import OTPScreen from '../screens/AuthScreens/OTPScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{animation: 'fade'}} // or 'slide_from_right'
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{animation: 'slide_from_right'}}
      />
      <AuthStack.Screen
        name="OTP"
        component={OTPScreen}
        options={{animation: 'slide_from_bottom'}}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
