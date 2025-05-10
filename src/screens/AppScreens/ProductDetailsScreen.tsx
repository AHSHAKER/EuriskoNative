import React from 'react';
import {View, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigator/Types';
import {products} from '../../data/Products';
import ShareButton from '../../components/atoms/ShareButton';
import AddToCartButton from '../../components/atoms/AddToCart';
import {useTheme} from '../../context/ThemeContext';
import CustomText from '../../components/atoms/CustomText';

type ProductDetailsRouteProp = RouteProp<MainStackParamList, 'ProductDetails'>;

const {width, height} = Dimensions.get('window');

const ProductDetailsScreen = () => {
  const {productId} = useRoute<ProductDetailsRouteProp>().params;
  const product = products.find(p => p._id === productId);
  const {dark} = useTheme();
  const styles = createStyles(dark);

  if (!product) {
    return (
      <CustomText style={{padding: width * 0.05, fontSize: width * 0.04}}>
        Product not found
      </CustomText>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: dark ? '#121212' : '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{uri: product.images[0]?.url}} style={styles.image} />
        <CustomText style={styles.title}>{product.title}</CustomText>
        <CustomText style={styles.price}>${product.price}</CustomText>
        <CustomText style={styles.description}>
          {product.description}
        </CustomText>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ShareButton />
        <AddToCartButton />
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const createStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      padding: width * 0.05,
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: height * 0.4,
      borderRadius: 10,
      marginBottom: height * 0.02,
    },
    title: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      marginBottom: height * 0.01,
      color: dark ? '#fff' : '#000',
    },
    price: {
      fontSize: width * 0.05,
      color: dark ? '#bbb' : '#888',
      marginBottom: height * 0.01,
    },
    description: {
      fontSize: width * 0.04,
      textAlign: 'center',
      color: dark ? '#ddd' : '#333',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.015,
      backgroundColor: dark ? '#222' : '#fff',
      borderTopWidth: 1,
      borderColor: dark ? '#444' : '#eee',
    },
  });
