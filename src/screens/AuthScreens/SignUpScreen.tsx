import React from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import SignUpForm from '../../components/organisms/SignUpForm';
import CustomText from '../../components/atoms/CustomText';

const {width, height} = Dimensions.get('window');

const SignUpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomText style={styles.title}>Create Account</CustomText>
      <SignUpForm />
    </ScrollView>
  );
};

export default SignUpScreen;

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
});
