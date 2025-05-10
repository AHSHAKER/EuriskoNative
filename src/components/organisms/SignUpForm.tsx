import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SignUpSchema, SignUpData} from '../../utils/schema';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import CustomText from '../atoms/CustomText';

const SignUpForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const onSubmit = (data: SignUpData) => {
    console.log('✅ Form Data:', data);
    navigation.navigate('OTP', {from: 'SignUp'});
  };

  return (
    <View>
      <CustomText style={styles.label}>Name</CustomText>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={text => setValue('name', text)}
        {...register('name')}
      />
      {errors.name && (
        <CustomText style={styles.error}>{errors.name.message}</CustomText>
      )}

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

      <CustomText style={styles.label}>Phone Number</CustomText>
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={text => setValue('phone', text)}
        {...register('phone')}
      />
      {errors.phone && (
        <CustomText style={styles.error}>{errors.phone.message}</CustomText>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <CustomText style={styles.buttonText}>Sign Up</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    color: 'black',
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
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
