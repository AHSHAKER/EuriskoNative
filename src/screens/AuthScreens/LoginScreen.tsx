import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import LoginForm from '../../components/organisms/LoginForm';

type Navigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <LoginForm />
      <Text style={styles.normalText}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#007aff',
    textAlign: 'center',
  },
  normalText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    color: '#333',
  },
});
