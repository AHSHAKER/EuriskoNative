import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import CustomText from '../atoms/CustomText';

const {width} = Dimensions.get('window');

const AddToCartButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <CustomText weight="bold" size={14} style={styles.text}>
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
    borderRadius: width * 0.02,
    padding: width * 0.02,
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    marginLeft: 6,
    color: '#fff',
  },
});
