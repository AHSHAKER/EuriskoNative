import React from 'react';
import {TouchableOpacity, StyleProp, ViewStyle, TextStyle} from 'react-native';
import CustomText from '../atoms/CustomText';

interface Props {
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const AddToCartButton = ({onPress, buttonStyle, textStyle}: Props) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <CustomText weight="bold" size={14} style={textStyle}>
        Add to Cart
      </CustomText>
    </TouchableOpacity>
  );
};

export default AddToCartButton;
