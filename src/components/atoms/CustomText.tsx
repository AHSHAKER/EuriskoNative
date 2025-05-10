import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

interface Props extends TextProps {
  weight?: 'regular' | 'bold';
}

const CustomText: React.FC<Props> = ({style, weight = 'regular', ...props}) => {
  const fontFamily = weight === 'bold' ? 'Rubik-Bold' : 'Rubik-Regular';
  return <Text {...props} style={[{fontFamily}, style]} />;
};

export default CustomText;
