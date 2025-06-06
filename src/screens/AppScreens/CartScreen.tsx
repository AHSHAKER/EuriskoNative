import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useCartStore} from '../../store/CartStore';
import {useAuthStore} from '../../store/AuthStore';
import {getProductById} from '../../api/products';
import CustomText from '../../components/atoms/CustomText';
import SwipeableItem from '../../components/atoms/SwipeableItem';
import {useTheme} from '../../context/ThemeContext';

const CartScreen = () => {
  const {dark} = useTheme();
  const styles = createStyles(dark);

  const items = useCartStore(state => state.items);
  const productIds = items.map(item => item.productId);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const fetched = await Promise.all(
          productIds.map(id => getProductById(accessToken, id)),
        );
        setProducts(fetched);
      } catch (err) {
        console.error('Failed to load cart products', err);
      } finally {
        setLoading(false);
      }
    };

    if (Array.isArray(productIds) && productIds.length > 0) {
      fetchCartProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [productIds]);

  const total = useMemo(() => {
    return products.reduce((sum, product) => {
      const cartItem = items.find(i => i.productId === product._id);
      const quantity = cartItem?.quantity || 0;
      return sum + product.price * quantity;
    }, 0);
  }, [products, items]);

  const renderItem = ({item}: {item: any}) => {
    const cartItem = items.find(i => i.productId === item._id);
    const quantity = cartItem?.quantity || 1;

    return (
      <SwipeableItem onDelete={() => removeFromCart(item._id)}>
        <View style={styles.card}>
          <Image
            source={{
              uri: `https://backend-practice.eurisko.me${item.images?.[0]?.url}`,
            }}
            style={styles.image}
          />
          <View style={styles.info}>
            <CustomText size={16} weight="bold" style={styles.title}>
              {item.title}
            </CustomText>
            <CustomText size={14} style={styles.price}>
              ${item.price} × {quantity} = ${item.price * quantity}
            </CustomText>
            <View style={styles.stepper}>
              <TouchableOpacity
                onPress={() =>
                  updateQuantity(item._id, Math.max(quantity - 1, 1))
                }>
                <CustomText style={styles.stepButton}>➖</CustomText>
              </TouchableOpacity>
              <CustomText style={styles.quantity}>{quantity}</CustomText>
              <TouchableOpacity
                onPress={() => updateQuantity(item._id, quantity + 1)}>
                <CustomText style={styles.stepButton}>➕</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SwipeableItem>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <CustomText size={14}>Loading cart...</CustomText>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <CustomText size={14}>Your cart is empty.</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
        <CustomText style={styles.clearText}>🗑️ Clear Cart</CustomText>
      </TouchableOpacity>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <CustomText size={16} weight="bold">
          Total: ${total.toFixed(2)}
        </CustomText>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => Alert.alert('Checkout', 'Order placed!')}>
          <CustomText style={styles.checkoutText}>🛒 Checkout</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const createStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    list: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: dark ? '#222' : '#fff',
      marginBottom: 12,
      borderRadius: 10,
      padding: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
      elevation: 3,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 12,
    },
    info: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      color: dark ? '#fff' : '#000',
      marginBottom: 4,
    },
    price: {
      color: dark ? '#bbb' : '#333',
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    stepButton: {
      fontSize: 20,
      paddingHorizontal: 10,
      color: dark ? '#fff' : '#000',
    },
    quantity: {
      fontSize: 16,
      marginHorizontal: 8,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearButton: {
      alignItems: 'flex-end',
      padding: 16,
    },
    clearText: {
      fontSize: 14,
      color: '#ff4444',
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderColor: dark ? '#333' : '#ddd',
      backgroundColor: dark ? '#111' : '#f9f9f9',
    },
    checkoutButton: {
      marginTop: 12,
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    checkoutText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
