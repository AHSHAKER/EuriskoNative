import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const AddToCartButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Add to Cart</Text>
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
    fontWeight: '600',
  },
});
