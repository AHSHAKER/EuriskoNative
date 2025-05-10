import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigator/Types';
import {products} from '../../data/Products';

type ProductDetailsRouteProp = RouteProp<MainStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const {productId} = useRoute<ProductDetailsRouteProp>().params;

  const product = products.find(p => p._id === productId);

  if (!product) {
    return <Text style={{padding: 20}}>Product not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: product.images[0]?.url}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
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
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
