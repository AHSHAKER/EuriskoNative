import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {getUserProfile, updateUserProfile} from '../../api/user';
import {useAuthStore} from '../../store/AuthStore';
import {useTheme} from '../../context/ThemeContext';

export default function ProfileScreen() {
  const accessToken = useAuthStore(state => state.accessToken);
  const {theme} = useTheme();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getUserProfile(accessToken);
      const user = res.data.user;
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile(accessToken, {firstName, lastName});
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator style={{marginTop: 50}} />;

  if (error) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Text style={{color: theme.text, marginBottom: 12, fontSize: 16}}>
          Failed to load profile.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfile}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.label, {color: theme.text}]}>First Name</Text>
      <TextInput
        style={[styles.input, {color: theme.text, borderColor: theme.card}]}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        placeholderTextColor="#999"
      />

      <Text style={[styles.label, {color: theme.text}]}>Last Name</Text>
      <TextInput
        style={[styles.input, {color: theme.text, borderColor: theme.card}]}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[styles.saveButton, saving && {opacity: 0.7}]}
        onPress={handleSave}
        disabled={saving}>
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
