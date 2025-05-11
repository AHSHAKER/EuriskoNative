import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema, LoginData} from '../../utils/schema';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import users from '../../data/Users.json';
import CustomText from '../atoms/CustomText';

const {width} = Dimensions.get('window');
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
    setLoginError('');
    const matchedUser = users.find(
      user =>
        user.username.toLowerCase() === data.email.trim().toLowerCase() &&
        user.password === data.password,
    );

    if (matchedUser) {
      navigation.navigate('OTP', {from: 'Login'});
    } else {
      setLoginError('Invalid email or password');
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

      {loginError !== '' && (
        <CustomText size={12} style={styles.error}>
          {loginError}
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
