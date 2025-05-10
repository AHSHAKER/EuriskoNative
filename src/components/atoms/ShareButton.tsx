import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ShareButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Share</Text>
    </TouchableOpacity>
  );
};

export default ShareButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007aff',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  text: {
    marginLeft: 6,
    color: '#007aff',
    fontWeight: '600',
  },
});
