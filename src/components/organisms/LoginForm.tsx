import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema, LoginData} from '../../utils/schema';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import CustomText from '../atoms/CustomText';
import {login, getUserProfile, resendOTP} from '../../api/auth';
import {useAuthStore} from '../../store/AuthStore';

const {width} = Dimensions.get('window');
type Navigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginForm = () => {
  const navigation = useNavigation<Navigation>();

  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      console.log('Attempting to log in with:', data);
      const res = await login({email: data.email, password: data.password});
      console.log('Login response:', res);

      // ✅ If login succeeds, user is verified
      const token = res.data?.accessToken;
      if (!token) throw new Error('Token missing from login response');
      console.log('Token received:', token);
      useAuthStore.getState().login(token);
    } catch (err: any) {
      console.log('Login error:', err);
      const status = err?.response?.status;
      const message =
        err?.response?.data?.error?.message ||
        'Login failed. Please try again.';

      // ❗️Handle unverified email
      if (status === 403 && message.toLowerCase().includes('verify')) {
        console.log('403 detected — user needs to verify email');
        try {
          console.log('Attempting to resend OTP...');
          await resendOTP(data.email);
          console.log('OTP resent successfully. Navigating to OTP screen...');
          navigation.navigate('OTP', {from: 'Login', email: data.email});
          return;
        } catch (otpErr: any) {
          console.log(
            'Failed to resend OTP:',
            otpErr?.response?.data || otpErr.message,
          );
          Alert.alert('Error', 'Could not resend OTP.');
          return;
        }
      }

      Alert.alert('Login Error', message);
    }
  };

  return (
    <View>
      <CustomText size={14} style={styles.label}>
        Email
      </CustomText>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={text => setValue('email', text)}
        {...register('email')}
      />
      {errors.email && (
        <CustomText size={12} style={styles.error}>
          {errors.email.message}
        </CustomText>
      )}

      <CustomText size={14} style={styles.label}>
        Password
      </CustomText>
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={text => setValue('password', text)}
        {...register('password')}
      />
      {errors.password && (
        <CustomText size={12} style={styles.error}>
          {errors.password.message}123
        </CustomText>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <CustomText size={16} weight="bold" style={styles.buttonText}>
          Log In
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.025,
    paddingVertical: width * 0.025,
    marginBottom: width * 0.02,
    backgroundColor: '#fff',
    color: '#333',
  },
  label: {
    marginBottom: width * 0.01,
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: width * 0.015,
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: width * 0.02,
    paddingVertical: width * 0.025,
    alignItems: 'center',
    marginTop: width * 0.04,
  },
  buttonText: {
    color: '#fff',
  },
});
