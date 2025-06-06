// components/atoms/CartHeaderButton.tsx

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CartButton: React.FC<Props> = ({style = {}, textStyle = {}}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={[styles.button, style]}>
      <Text style={[styles.icon, textStyle]}>🛒</Text>
    </TouchableOpacity>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
});
