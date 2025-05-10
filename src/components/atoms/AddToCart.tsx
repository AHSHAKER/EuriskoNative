import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../atoms/CustomText';

const AddToCartButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <CustomText style={styles.text} weight="bold">
        Add to Cart
      </CustomText>
    </TouchableOpacity>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007aff',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    marginLeft: 6,
    color: '#fff',
  },
});
