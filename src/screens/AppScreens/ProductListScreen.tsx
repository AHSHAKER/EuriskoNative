import React, {useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import ProductItem from '../../components/molecules/ProductItem';
import {products} from '../../data/Products';
import {useTheme} from '../../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const {theme, toggleTheme} = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeButton, {backgroundColor: theme.card}]}>
          <Text style={[styles.themeIcon, {color: theme.text}]}>🌓</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, toggleTheme, theme]);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
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
  themeButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeIcon: {
    fontSize: 18,
  },
});
