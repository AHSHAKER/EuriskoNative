import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../navigator/Types';
import {useAuthStore} from '../../store/AuthStore';
import CustomText from '../../components/atoms/CustomText';

type Navigation = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;

const {width, height} = Dimensions.get('window');

const OTPScreen = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const from = (route.params as any)?.from || 'Unknown';

  const [otp, setOtp] = useState('');
  const login = useAuthStore(state => state.login);

  const handleChange = (text: string) => {
    const filtered = text.replace(/[^0-9]/g, '');
    if (filtered.length <= 4) {
      setOtp(filtered);
    }
  };

  const handleVerify = () => {
    if (otp.length === 4) {
      login('mock-token');
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
        placeholder="Enter 4-digit OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={handleChange}
        maxLength={4}
      />

      <TouchableOpacity
        onPress={handleVerify}
        style={[styles.button, otp.length !== 4 && styles.buttonDisabled]}
        disabled={otp.length !== 4}>
        <CustomText size={16} weight="bold" style={styles.buttonText}>
          Verify
        </CustomText>
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
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
  },
});
