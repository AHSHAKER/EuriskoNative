import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SignUpSchema, SignUpData} from '../../utils/schema';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import CustomText from '../atoms/CustomText';

const {width} = Dimensions.get('window');

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
      <CustomText size={14} style={styles.label}>
        Name
      </CustomText>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={text => setValue('name', text)}
        {...register('name')}
      />
      {errors.name && (
        <CustomText size={12} style={styles.error}>
          {errors.name.message}
        </CustomText>
      )}

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

      <CustomText size={14} style={styles.label}>
        Phone Number
      </CustomText>
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={text => setValue('phone', text)}
        {...register('phone')}
      />
      {errors.phone && (
        <CustomText size={12} style={styles.error}>
          {errors.phone.message}
        </CustomText>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <CustomText size={16} weight="bold" style={styles.buttonText}>
          Sign Up
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.025,
    marginBottom: width * 0.02,
    backgroundColor: '#fff',
    color: 'black',
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: width * 0.02,
    paddingVertical: width * 0.04,
    alignItems: 'center',
    marginTop: width * 0.04,
  },
  buttonText: {
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: width * 0.02,
  },
  label: {
    marginBottom: width * 0.01,
    color: '#333',
  },
});
