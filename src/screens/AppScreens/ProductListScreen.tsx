import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import ProductItem from '../../components/molecules/ProductItem';
import {products} from '../../data/Products';

const ProductListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ProductItem
            id={item._id}
            title={item.title}
            price={item.price}
            imageUrl={item.images[0]?.url}
          />
        )}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 10,
  },
});
