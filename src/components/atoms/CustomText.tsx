import React from 'react';
import {Text, TextProps, StyleSheet, PixelRatio, TextStyle} from 'react-native';

interface Props extends TextProps {
  weight?: 'regular' | 'bold';
  size?: number;
}

const CustomText: React.FC<Props> = ({
  style,
  weight = 'regular',
  size = 16,
  ...props
}) => {
  const fontFamily = weight === 'bold' ? 'Rubik-Bold' : 'Rubik-Regular';
  const fontSize = size * PixelRatio.getFontScale();

  const textStyle: TextStyle = {
    fontFamily,
    fontSize,
  };

  return <Text {...props} style={[textStyle, style]} />;
};

export default CustomText;
