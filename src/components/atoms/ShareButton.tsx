import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Share} from 'react-native';
import CustomText from '../atoms/CustomText';

const {width} = Dimensions.get('window');

const ShareButton = ({productId}) => {
  const handleShare = async () => {
    const shareUrl = `https://backend-practice.eurisko.me/products/${productId}`;
    try {
      await Share.share({
        message: `Check out this product: ${shareUrl}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleShare}>
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
