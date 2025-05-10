import React, {useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ProductItem from '../../components/molecules/ProductItem';
import {products} from '../../data/Products';
import {useTheme} from '../../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/atoms/CustomText';

const {width, height} = Dimensions.get('window');

const ProductListScreen = () => {
  const navigation = useNavigation();
  const {theme, toggleTheme} = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeButton, {backgroundColor: theme.card}]}>
          <CustomText style={[styles.themeIcon, {color: theme.text}]}>
            🌓
          </CustomText>
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
        contentContainerStyle={{paddingBottom: height * 0.02}}
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: height * 0.01,
  },
  themeButton: {
    padding: width * 0.02,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeIcon: {
    fontSize: width * 0.045,
  },
});
