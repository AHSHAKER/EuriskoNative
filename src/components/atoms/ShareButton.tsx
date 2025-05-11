import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import CustomText from '../atoms/CustomText';

const {width} = Dimensions.get('window');

const ShareButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <CustomText weight="bold" size={14} style={styles.text}>
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
    borderRadius: width * 0.02,
    padding: width * 0.02,
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  text: {
    marginLeft: 6,
    color: '#007aff',
  },
});
