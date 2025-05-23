import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../store/AuthStore';
import {getProductById, updateProduct} from '../../api/products';
import {MainStackParamList} from '../../navigator/Types';
import {useTheme} from '../../context/ThemeContext';
import LocationPicker from '../../components/molecules/LocationPicker';
import CustomText from '../../components/atoms/CustomText';

type EditProductRouteProp = RouteProp<MainStackParamList, 'EditProduct'>;

const EditProductScreen = () => {
  const {dark} = useTheme();
  const styles = getStyles(dark);

  const navigation = useNavigation();
  const accessToken = useAuthStore(state => state.accessToken);
  const {productId} = useRoute<EditProductRouteProp>().params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationCoords, setLocationCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [images, setImages] = useState<
    {uri: string; type: string; name: string}[]
  >([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchProduct = async () => {
      try {
        console.log('Fetching product with ID:', productId);
        const product = await getProductById(accessToken, productId);

        setTitle(product.title);
        setDescription(product.description);
        setPrice(String(product.price));

        if (product.location) {
          setLocationName(product.location.name || '');
          setLocationCoords({
            latitude: product.location.latitude,
            longitude: product.location.longitude,
          });
        }

        if (Array.isArray(product.images)) {
          const formattedImages = product.images.map(
            (img: any, index: number) => ({
              uri: `https://backend-practice.eurisko.me${img.url}`,
              type: 'image/jpeg',
              name: `image${index}.jpg`,
            }),
          );
          setImages(formattedImages);
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to load product details');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [accessToken, productId, navigation]);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
    });

    if (result.assets && result.assets.length > 0) {
      const newImages = result.assets.map(asset => ({
        uri: asset.uri || '',
        type: asset.type || 'image/jpeg',
        name: asset.fileName || `image_${Date.now()}.jpg`,
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSave = async () => {
    if (!accessToken) return;

    if (!title || !description || !price) {
      Alert.alert('Validation', 'Please fill all required fields.');
      return;
    }

    setSaving(true);

    try {
      console.log('Fetching product with ID:', productId);

      await updateProduct(accessToken, productId, {
        title,
        description,
        price,
        location:
          locationCoords && locationName
            ? {
                name: locationName,
                latitude: locationCoords.latitude,
                longitude: locationCoords.longitude,
              }
            : undefined,
        images,
      });

      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={dark ? '#fff' : '#000'} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 16}}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor={dark ? '#888' : '#aaa'}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, {height: 100}]}
        placeholderTextColor={dark ? '#888' : '#aaa'}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor={dark ? '#888' : '#aaa'}
      />

      <CustomText style={styles.label}>Location</CustomText>
      <TouchableOpacity
        onPress={() => setLocationPickerVisible(true)}
        style={styles.pickButton}>
        <CustomText style={styles.pickButtonText}>Pick Location</CustomText>
      </TouchableOpacity>
      <CustomText style={{marginBottom: 10, color: dark ? '#fff' : '#000'}}>
        {`Lat: ${locationCoords?.latitude || 'N/A'}, Lng: ${
          locationCoords?.longitude || 'N/A'
        }`}
      </CustomText>

      <LocationPicker
        visible={locationPickerVisible}
        onClose={() => setLocationPickerVisible(false)}
        onLocationPicked={loc => {
          setLocationCoords({latitude: loc.latitude, longitude: loc.longitude});
          setLocationName(loc.name || 'Picked Location');
        }}
      />

      <TouchableOpacity style={styles.pickButton} onPress={handleImagePick}>
        <CustomText style={styles.pickButtonText}>Pick Images</CustomText>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginBottom: 16}}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{uri: img.uri}} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}>
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.pickButton, saving && styles.disabledButton]}
        onPress={handleSave}
        disabled={saving}
        activeOpacity={saving ? 1 : 0.7}>
        <CustomText style={styles.pickButtonText}>
          {saving ? 'Saving...' : 'Save'}
        </CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProductScreen;

const getStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: dark ? '#121212' : '#fff',
    },
    input: {
      backgroundColor: dark ? '#222' : '#f0f0f0',
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 12,
      color: dark ? '#fff' : '#000',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageWrapper: {
      position: 'relative',
      marginRight: 12,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    removeButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: 'red',
      borderRadius: 12,
      padding: 4,
      zIndex: 10,
    },
    removeText: {
      color: 'white',
      fontWeight: 'bold',
    },
    pickButton: {
      backgroundColor: dark ? '#0a84ff' : '#007aff',
      borderRadius: 6,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    pickButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    disabledButton: {
      backgroundColor: '#888',
      shadowOpacity: 0,
      elevation: 0,
    },
    label: {
      fontWeight: '600',
      marginBottom: 8,
      color: dark ? '#fff' : '#000',
    },
  });
