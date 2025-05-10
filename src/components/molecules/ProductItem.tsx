import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

type ProductItemProps = {
  title: string;
  price: number;
  imageUrl: string;
};

const ProductItem: React.FC<ProductItemProps> = ({title, price, imageUrl}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
});
