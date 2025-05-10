import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigator/Types';
import {products} from '../../data/Products';
import ShareButton from '../../components/atoms/ShareButton';
import AddToCartButton from '../../components/atoms/AddToCart';
import {useTheme} from '../../context/ThemeContext';

type ProductDetailsRouteProp = RouteProp<MainStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const {productId} = useRoute<ProductDetailsRouteProp>().params;
  const product = products.find(p => p._id === productId);
  const {dark} = useTheme();
  const styles = createStyles(dark);

  if (!product) {
    return <Text style={{padding: 20}}>Product not found</Text>;
  }

  return (
    <View style={{flex: 1, backgroundColor: dark ? '#121212' : '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{uri: product.images[0]?.url}} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
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
      padding: 20,
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: dark ? '#fff' : '#000',
    },
    price: {
      fontSize: 20,
      color: dark ? '#bbb' : '#888',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      color: dark ? '#ddd' : '#333',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: dark ? '#222' : '#fff',
      borderTopWidth: 1,
      borderColor: dark ? '#444' : '#eee',
    },
  });
