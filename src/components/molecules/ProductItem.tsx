import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MainStackParamList} from '../../navigator/Types';
import {useTheme} from '../../context/ThemeContext';
import CustomText from '../atoms/CustomText';

const {width} = Dimensions.get('window');

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

  const baseURL = 'https://backend-practice.eurisko.me';
  const isRelative = imageUrl && !imageUrl.startsWith('http');
  const fullImageUrl = imageUrl
    ? isRelative
      ? `${baseURL}${imageUrl}`
      : imageUrl
    : 'https://via.placeholder.com/150'; // fallback image

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', {productId: id})}>
      <Image source={{uri: fullImageUrl}} style={styles.image} />
      <View style={styles.info}>
        <CustomText size={16} weight="bold" style={styles.title}>
          {title}
        </CustomText>
        <CustomText size={14} style={styles.price}>
          ${price}
        </CustomText>
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
      marginHorizontal: width * 0.02,
      marginVertical: width * 0.02,
      borderRadius: width * 0.02,
      padding: width * 0.02,
      elevation: 2,
      alignItems: 'center',
    },
    image: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.02,
      marginRight: width * 0.04,
      backgroundColor: '#ccc',
    },
    info: {
      flex: 1,
    },
    title: {
      color: dark ? '#fff' : '#000',
    },
    price: {
      marginTop: width * 0.01,
      color: dark ? '#ccc' : '#333',
    },
  });
