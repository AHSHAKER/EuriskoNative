import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SignUpSchema, SignUpData} from '../../utils/schema';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigator/Types';

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
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onSubmit = (data: SignUpData) => {
    console.log('✅ Form Data:', data);
    navigation.navigate('OTP', {from: 'SignUp'});
  };

  return (
    <View>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={text => setValue('name', text)}
        {...register('name')}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={text => setValue('email', text)}
        {...register('email')}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={text => setValue('password', text)}
        {...register('password')}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={text => setValue('phone', text)}
        {...register('phone')}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
