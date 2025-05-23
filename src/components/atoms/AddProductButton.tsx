import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MainStackParamList} from '../../navigator/types';
import CustomText from './CustomText';

type NavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'AddProduct'
>;

const AddProductButton = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('AddProduct')}>
      <CustomText size={24}>+</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
});

export default AddProductButton;
