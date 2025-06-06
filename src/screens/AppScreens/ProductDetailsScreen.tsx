import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useTheme} from '../../context/ThemeContext';
import CustomText from '../../components/atoms/CustomText';
import {getProductById} from '../../api/products';
import {MainStackParamList} from '../../navigator/Types';
import downloadImageWithAxios from '../../api/imgDownload';
import {useAuthStore} from '../../store/AuthStore';
import EditProductButton from '../../components/atoms/EditProductButton';
import DeleteProductButton from '../../components/atoms/DeleteProductButton';
import {getUserIdFromToken} from '../../utils/UserIdHelper';
import MapView, {Marker} from 'react-native-maps';
import AddToCartButton from '../../components/atoms/AddToCart';
import {useCartStore} from '../../store/CartStore';
import ShareButton from '../../components/atoms/ShareButton';

const {width, height} = Dimensions.get('window');

type ProductDetailsRouteProp = RouteProp<MainStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const {productId} = useRoute<ProductDetailsRouteProp>().params;
  const addToCart = useCartStore(state => state.addToCart);
  const {dark} = useTheme();
  const styles = createStyles(dark);
  const [product, setProduct] = useState<any>(null);
  const userId = getUserIdFromToken(accessToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!accessToken) return;

        const product = await getProductById(accessToken, productId);
        setProduct(product);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [accessToken, productId]);

  const handleLongPressImage = async (relativeUrl: string) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return Alert.alert(
            'Permission Denied',
            'Storage permission is required.',
          );
        }
      }

      const fullUrl = `https://backend-practice.eurisko.me${relativeUrl}`;
      await downloadImageWithAxios(fullUrl);
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert('Error', 'Image download failed.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <CustomText size={14}>Loading...</CustomText>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <CustomText size={14}>Product not found</CustomText>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: dark ? '#121212' : '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{height: height * 0.4, width: '100%'}}>
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={0}
            data={Array.isArray(product.images) ? product.images : []}
            renderItem={({item}) => (
              <TouchableWithoutFeedback
                onLongPress={() => handleLongPressImage(item.url)}>
                <Image
                  source={{
                    uri: `https://backend-practice.eurisko.me${item.url}`,
                  }}
                  style={styles.image}
                />
              </TouchableWithoutFeedback>
            )}
            showPagination
            paginationStyle={{bottom: 10}}
          />
        </View>

        <CustomText size={20} weight="bold" style={styles.title}>
          {product.title}
        </CustomText>
        <CustomText size={18} style={styles.price}>
          ${product.price}
        </CustomText>

        <View style={styles.ownerContainer}>
          <CustomText size={14} weight="bold">
            Owner: {product.user?.name}
          </CustomText>
          <CustomText size={14} style={{color: 'blue'}}>
            {product.user?.email}
          </CustomText>
        </View>

        <CustomText size={15} style={styles.description}>
          {product.description}
        </CustomText>

        {product.location?.latitude && product.location?.longitude && (
          <View
            style={{
              height: 200,
              width: '90%',
              marginTop: 16,
              borderRadius: 10,
              overflow: 'hidden',
              alignSelf: 'center',
            }}>
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: product.location.latitude,
                longitude: product.location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              pitchEnabled={false}
              rotateEnabled={false}>
              <Marker coordinate={product.location} />
            </MapView>
          </View>
        )}

        {product.user?._id === userId && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 16,
            }}>
            <EditProductButton productId={productId} />
            <DeleteProductButton productId={productId} />
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ShareButton productId={productId} />

        <AddToCartButton
          buttonStyle={styles.activeButton}
          textStyle={styles.activeText}
          onPress={() => {
            addToCart(product._id); // Add product ID to Zustand cart
            Alert.alert('Success', 'Product added to cart!');
          }}
        />
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const createStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      paddingBottom: 40,
      alignItems: 'center',
    },
    image: {
      width,
      height: height * 0.34,
    },
    title: {
      marginTop: 10,
      color: dark ? '#fff' : '#000',
    },
    price: {
      marginVertical: 8,
      color: dark ? '#bbb' : '#444',
    },
    description: {
      marginHorizontal: 16,
      textAlign: 'center',
      color: dark ? '#ddd' : '#333',
    },
    ownerContainer: {
      marginTop: 20,
      paddingHorizontal: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: '2.5%', // 2.5% margin on left and right
      borderTopWidth: 1,
      borderColor: dark ? '#444' : '#eee',
      backgroundColor: dark ? '#222' : '#fff',
    },
    disabledButton: {
      width: '49%',
      backgroundColor: dark ? '#333' : '#ccc',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },

    disabledText: {
      color: '#888',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeButton: {
      width: '49%',
      backgroundColor: '#007aff',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    activeText: {
      color: '#fff',
    },
  });
