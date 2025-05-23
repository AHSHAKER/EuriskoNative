import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import {verifyEmailOtp, resendOTP} from '../../api/auth';
import CustomText from '../../components/atoms/CustomText';

type Navigation = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;
const {width, height} = Dimensions.get('window');

const OTPScreen = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const from = (route.params as any)?.from || 'Unknown';
  const email = (route.params as any)?.email;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleChange = (text: string) => {
    const filtered = text.replace(/[^0-9]/g, '');
    if (filtered.length <= 6) {
      setOtp(filtered);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6 || !email) return;
    console.log('Verifying OTP:', otp);

    setLoading(true);
    try {
      console.log('Verifying OTP for email:', email, 'OTP:', otp);
      await verifyEmailOtp(email, otp);
      console.log('OTP verified successfully');
      Alert.alert('Success', 'Email verified. Please log in.');
      navigation.navigate('Login');
    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message ||
        'Verification failed. Please try again.';
      console.log('Verification error:', msg);
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    try {
      await resendOTP(email);
      Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message ||
        'Failed to resend OTP. Please try again.';
      Alert.alert('Error', msg);
    } finally {
      setResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText size={28} weight="bold" style={styles.title}>
        OTP Verification
      </CustomText>
      <CustomText size={16} style={styles.subtitle}>
        Verifying for: {from}
      </CustomText>

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={handleChange}
        maxLength={6}
        editable={!loading}
      />

      <TouchableOpacity
        onPress={handleVerify}
        style={[
          styles.button,
          (otp.length !== 6 || loading) && styles.buttonDisabled,
        ]}
        disabled={otp.length !== 6 || loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <CustomText size={16} weight="bold" style={styles.buttonText}>
            Verify
          </CustomText>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleResend}
        style={[styles.resendButton, resending && styles.buttonDisabled]}
        disabled={resending}>
        {resending ? (
          <ActivityIndicator size="small" color="#007aff" />
        ) : (
          <CustomText size={14} weight="regular" style={styles.resendText}>
            Resend OTP
          </CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.06,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: height * 0.03,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.025,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
  },
  resendButton: {
    alignItems: 'center',
  },
  resendText: {
    color: '#007aff',
  },
});
