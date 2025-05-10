import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../atoms/CustomText';

const ShareButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <CustomText style={styles.text} weight="bold">
        Share
      </CustomText>
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
  },
});
