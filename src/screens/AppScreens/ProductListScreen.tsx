import React, {useLayoutEffect, useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import ProductItem from '../../components/molecules/ProductItem';
import {useTheme} from '../../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/atoms/CustomText';
import AddProductButton from '../../components/atoms/AddProductButton';
import {getProducts} from '../../api/products';
import type {Product} from '../../navigator/Types';
import {useAuthStore} from '../../store/AuthStore';

const {width, height} = Dimensions.get('window');

const ProductListScreen = () => {
  const navigation = useNavigation();
  const {theme, toggleTheme} = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const {accessToken} = useAuthStore();

  const fetchData = useCallback(
    async (pageNumber = 1, refreshing = false) => {
      try {
        if (refreshing) setRefreshing(true);
        else setLoading(true);

        const response = await getProducts(accessToken, {
          page: pageNumber,
          limit: 10,
          search,
          sortBy: 'price',
          order: sortOrder,
        });

        const fetchedProducts = response.data;

        setProducts(prev =>
          pageNumber === 1 ? fetchedProducts : [...prev, ...fetchedProducts],
        );
        setPage(response.pagination.currentPage);
        setHasNextPage(response.pagination.hasNextPage);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [search, sortOrder, accessToken],
  );

  useEffect(() => {
    fetchData(1);
  }, [search, sortOrder]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeButton, {backgroundColor: theme.card}]}>
          <CustomText size={20}>🌓</CustomText>
        </TouchableOpacity>
      ),
    });
  }, [navigation, toggleTheme, theme]);

  const handleLoadMore = () => {
    if (hasNextPage && !loading) {
      fetchData(page + 1);
    }
  };

  const handleRefresh = () => {
    fetchData(1, true);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.searchRow}>
        <TextInput
          value={search}
          onChangeText={text => setSearch(text)}
          placeholder="Search products..."
          placeholderTextColor="#999"
          style={[
            styles.searchInput,
            {backgroundColor: theme.card, color: theme.text},
          ]}
        />
        <TouchableOpacity
          onPress={() =>
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
          }
          style={[styles.sortButton, {backgroundColor: theme.card}]}>
          <CustomText size={14}>
            {sortOrder === 'asc' ? '⬆️ Price' : '⬇️ Price'}
          </CustomText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item: Product) => item._id}
        renderItem={({item}: {item: Product}) => (
          <ProductItem
            id={item._id}
            title={item.title}
            price={item.price}
            imageUrl={item.images?.[0]?.url || ''}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={
          loading && !refreshing ? <ActivityIndicator /> : null
        }
        contentContainerStyle={{paddingBottom: height * 0.02}}
      />
      <AddProductButton />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.01,
  },
  themeButton: {
    padding: width * 0.02,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.01,
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  sortButton: {
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
