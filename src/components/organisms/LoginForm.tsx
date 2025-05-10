import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema, LoginData} from '../../utils/schema';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import users from '../../data/Users.json';
import CustomText from '../atoms/CustomText';

type Navigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginForm = () => {
  const navigation = useNavigation<Navigation>();
  const [loginError, setLoginError] = useState('');

  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginData) => {
    console.log('✅ Login Data:', data);
    setLoginError('');
    const matchedUser = users.find(
      user =>
        user.username.toLowerCase() === data.email.trim().toLowerCase() &&
        user.password === data.password,
    );

    if (matchedUser) {
      navigation.navigate('OTP', {from: 'Login'});
    } else {
      console.log('❌ Invalid credentials');
      setLoginError('Invalid email or password');
    }
  };

  return (
    <View>
      <CustomText style={styles.label}>Email</CustomText>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={text => setValue('email', text)}
        {...register('email')}
      />
      {errors.email && (
        <CustomText style={styles.error}>{errors.email.message}</CustomText>
      )}

      <CustomText style={styles.label}>Password</CustomText>
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={text => setValue('password', text)}
        {...register('password')}
      />
      {errors.password && (
        <CustomText style={styles.error}>{errors.password.message}</CustomText>
      )}

      {loginError !== '' && (
        <CustomText style={styles.error}>{loginError}</CustomText>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <CustomText style={styles.buttonText}>Log In</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
