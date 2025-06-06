import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

const {width} = Dimensions.get('window');

const ProductSkeleton = () => {
  const {dark} = useTheme();
  const styles = createStyles(dark);

  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.info}>
        <View style={styles.title} />
        <View style={styles.price} />
      </View>
    </View>
  );
};

export default ProductSkeleton;

const createStyles = (dark: boolean) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: dark ? '#444' : '#e0e0e0',
      marginHorizontal: width * 0.02,
      marginVertical: width * 0.02,
      borderRadius: width * 0.02,
      padding: width * 0.02,
      alignItems: 'center',
    },
    image: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.02,
      backgroundColor: dark ? '#666' : '#ccc',
      marginRight: width * 0.04,
    },
    info: {
      flex: 1,
    },
    title: {
      width: '70%',
      height: 16,
      borderRadius: 4,
      backgroundColor: dark ? '#555' : '#bbb',
      marginBottom: 8,
    },
    price: {
      width: '40%',
      height: 14,
      borderRadius: 4,
      backgroundColor: dark ? '#555' : '#bbb',
    },
  });
