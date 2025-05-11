import React from 'react';
import {StyleSheet} from 'react-native';
import CustomText from './CustomText';
import {useTheme} from '../../context/ThemeContext';

const HeaderTitle = () => {
  const {theme} = useTheme();

  return (
    <CustomText size={22} style={[styles.title, {color: theme.text}]}>
      HZero
    </CustomText>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
