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
import debounce from 'lodash.debounce';
import ProductItem from '../../components/molecules/ProductItem';
import {useTheme} from '../../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/atoms/CustomText';
import AddProductButton from '../../components/atoms/AddProductButton';
import {getProducts, searchProducts} from '../../api/products';
import type {Product} from '../../navigator/Types';
import {useAuthStore} from '../../store/AuthStore';
import LogoutButton from '../../components/atoms/LogoutButton';

const {width, height} = Dimensions.get('window');

const ProductListScreen = () => {
  const navigation = useNavigation();
  const {theme, toggleTheme} = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const debouncedUpdate = useCallback(
    debounce((text: string) => {
      setDebouncedSearch(text);
    }, 500),
    [],
  );

  const {accessToken} = useAuthStore();

  const fetchData = useCallback(
    async (pageNumber = 1, refreshing = false) => {
      try {
        if (refreshing) setRefreshing(true);
        else setLoading(true);

        let fetchedProducts = [];

        if (debouncedSearch.trim()) {
          fetchedProducts = await searchProducts(
            accessToken,
            debouncedSearch.trim(),
          );
          setProducts(fetchedProducts);
          setHasNextPage(false);
        } else {
          const response = await getProducts(accessToken, {
            page: pageNumber,
            limit: 10,
            sortBy: 'price',
            order: sortOrder,
          });

          fetchedProducts = response.data;
          setProducts(prev =>
            pageNumber === 1 ? fetchedProducts : [...prev, ...fetchedProducts],
          );
          setPage(response.pagination.currentPage);
          setHasNextPage(response.pagination.hasNextPage);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [debouncedSearch, sortOrder, accessToken],
  );

  useEffect(() => {
    fetchData(1);
  }, [debouncedSearch, sortOrder]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.headerButton, {backgroundColor: theme.card}]}>
            <CustomText size={25}>🌓</CustomText>
          </TouchableOpacity>
          <LogoutButton
            style={[styles.headerButton, {backgroundColor: theme.card}]}
          />
        </View>
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
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            debouncedUpdate(text);
          }}
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
  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: width * 0.02,
    columnGap: width * 0.02, // Works in RN >= 0.71, use marginRight fallback below if needed
    maxWidth: width * 0.45, // Prevents overflow beyond screen
  },
  headerButton: {
    width: width * 0.2,
    height: width * 0.1 + width * 0.04, // optional, visually consistent
    borderRadius: width * 0.05,
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
