import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import LoginForm from '../../components/organisms/LoginForm';
import CustomText from '../../components/atoms/CustomText';

const {width, height} = Dimensions.get('window');

type Navigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomText style={styles.title}>Log In</CustomText>
      <LoginForm />
      <CustomText style={styles.normalText}>Don't have an account?</CustomText>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <CustomText style={styles.link}>Sign Up</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.05,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.04,
    textAlign: 'center',
    color: '#333',
  },
  link: {
    fontSize: width * 0.04,
    color: '#007aff',
    textAlign: 'center',
  },
  normalText: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginTop: height * 0.03,
    color: '#333',
  },
});
