import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigator/Types';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'OTP'>;

const OTPScreen = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const from = (route.params as any)?.from || 'Unknown';

  const [otp, setOtp] = useState('');

  const handleChange = (text: string) => {
    const filtered = text.replace(/[^0-9]/g, '');
    if (filtered.length <= 4) {
      setOtp(filtered);
    }
  };

  const handleVerify = () => {
    if (otp.length === 4) {
      navigation.navigate('Done', {from: 'OTP'});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Verifying for: {from}</Text>
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
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
