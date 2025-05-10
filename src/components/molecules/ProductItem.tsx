import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MainStackParamList} from '../../navigator/Types';
import {useTheme} from '../../context/ThemeContext';

type ProductItemProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
};

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  title,
  price,
  imageUrl,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {dark} = useTheme();
  const styles = createStyles(dark);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', {productId: id})}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const createStyles = (dark: boolean) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: dark ? '#333' : '#fff',
      marginHorizontal: 10,
      marginVertical: 6,
      borderRadius: 8,
      padding: 10,
      elevation: 2,
      alignItems: 'center',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 6,
      marginRight: 10,
    },
    info: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: dark ? '#fff' : '#000',
    },
    price: {
      fontSize: 14,
      marginTop: 4,
      color: dark ? '#ccc' : '#333',
    },
  });
