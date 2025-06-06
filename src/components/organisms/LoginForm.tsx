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
import {login, resendOTP} from '../../api/auth';
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

      const {accessToken, refreshToken} = res.data;
      if (!accessToken || !refreshToken) {
        throw new Error('Tokens missing from login response');
      }

      console.log('Tokens received:', {accessToken, refreshToken});
      useAuthStore.getState().login({accessToken, refreshToken}); // ✅ Fixed
    } catch (err: any) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.error?.message ||
        'Login failed. Please try again.';

      if (status === 403 && message.toLowerCase().includes('verify')) {
        try {
          await resendOTP(data.email);
          navigation.navigate('OTP', {from: 'Login', email: data.email});
          return;
        } catch {
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
          {errors.password.message}
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
