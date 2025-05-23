import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ProductSchema, ProductFormData} from '../../utils/schema/ProductSchema';
import {launchImageLibrary} from 'react-native-image-picker';
import {createProduct} from '../../api/products';
import {useAuthStore} from '../../store/AuthStore';
import CustomText from '../atoms/CustomText';
import LocationPicker from '../molecules/LocationPicker';
import {useTheme} from '../../context/ThemeContext';

const AddProductForm = () => {
  const {dark} = useTheme();
  const styles = getStyles(dark);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      images: [],
    },
  });

  const [localImages, setLocalImages] = useState<any[]>([]);
  const accessToken = useAuthStore(state => state.accessToken);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    name: 'Default Location',
    latitude: 36.8065,
    longitude: 10.1815,
  });

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Gallery Permission',
          message: 'App needs access to your photos to upload product images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const onPickImage = async () => {
    console.log('Picking images...');
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      console.log('Permission denied');
      Alert.alert('Permission denied', 'Cannot access gallery.');
      return;
    }

    launchImageLibrary({mediaType: 'photo', selectionLimit: 5}, res => {
      if (res.assets) {
        const newAssets = res.assets.slice(0, 5 - localImages.length); // restrict to max 5
        const updatedImages = [...localImages, ...newAssets].slice(0, 5); // ensure max of 5
        const imageUris = updatedImages.map(img => img.uri);

        console.log('Selected images:', updatedImages);
        setLocalImages(updatedImages);
        setValue('images', imageUris as string[]);
        console.log('Updated images:', imageUris);
      }
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = [...localImages];
    updatedImages.splice(index, 1);
    setLocalImages(updatedImages);
    setValue('images', updatedImages.map(img => img.uri) as string[]);
  };

  const onSubmit = async (form: ProductFormData) => {
    try {
      const payload = {
        title: form.name,
        description: form.description,
        price: parseFloat(form.price as any),
        location: {
          name: selectedLocation.name,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        images: localImages.map((img, index) => ({
          uri: img.uri,
          type: img.type ?? 'image/jpeg',
          name: img.fileName ?? `image_${index}.jpg`,
        })),
      };

      console.log('Submitting product:', payload, accessToken);
      await createProduct(accessToken, payload);
      Alert.alert('Success', 'Product created successfully!');
      setLocalImages([]);
      reset();
    } catch (error: any) {
      Alert.alert(
        'Error creating product',
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <CustomText style={styles.label}>Name</CustomText>
      <Controller
        control={control}
        name="name"
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Product name"
            placeholderTextColor={dark ? '#888' : '#aaa'}
            style={styles.input}
          />
        )}
      />
      {errors.name && (
        <CustomText style={styles.error}>{errors.name.message}</CustomText>
      )}

      <CustomText style={styles.label}>Description</CustomText>
      <Controller
        control={control}
        name="description"
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Product description"
            placeholderTextColor={dark ? '#888' : '#aaa'}
            multiline
            style={[styles.input, styles.textArea]}
          />
        )}
      />
      {errors.description && (
        <CustomText style={styles.error}>
          {errors.description.message}
        </CustomText>
      )}

      <CustomText style={styles.label}>Price</CustomText>
      <Controller
        control={control}
        name="price"
        render={({field: {value, onChange}}) => (
          <TextInput
            value={String(value)}
            onChangeText={onChange}
            placeholder="Price (e.g., 99.99)"
            placeholderTextColor={dark ? '#888' : '#aaa'}
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />
      {errors.price && (
        <CustomText style={styles.error}>{errors.price.message}</CustomText>
      )}

      <CustomText style={styles.label}>Images</CustomText>
      <TouchableOpacity onPress={onPickImage} style={styles.pickButton}>
        <CustomText style={styles.pickButtonText}>Pick Images</CustomText>
      </TouchableOpacity>
      {errors.images && (
        <CustomText style={styles.error}>{errors.images.message}</CustomText>
      )}

      {localImages.length > 0 && (
        <ScrollView horizontal style={styles.imagePreviewContainer}>
          {localImages.map((img, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => removeImage(i)}
              style={styles.imageWrapper}>
              <Image source={{uri: img.uri}} style={styles.imageThumbnail} />
              <CustomText style={styles.removeImageText}>✕</CustomText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <CustomText style={styles.label}>Location</CustomText>
      <TouchableOpacity
        onPress={() => setLocationPickerVisible(true)}
        style={styles.pickButton}>
        <CustomText style={styles.pickButtonText}>Pick Location</CustomText>
      </TouchableOpacity>
      <CustomText style={{marginBottom: 10, color: dark ? '#fff' : '#000'}}>
        {`Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`}
      </CustomText>

      <LocationPicker
        visible={locationPickerVisible}
        onClose={() => setLocationPickerVisible(false)}
        onLocationPicked={loc => {
          setSelectedLocation({...loc, name: 'Picked Location'});
        }}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}>
        <CustomText style={styles.submitButtonText}>Submit Product</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: dark ? '#121212' : '#fff',
      flexGrow: 1,
    },
    label: {
      fontWeight: '600',
      marginBottom: 4,
      color: dark ? '#eee' : '#111',
    },
    input: {
      borderWidth: 1,
      borderColor: dark ? '#444' : '#ccc',
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      color: dark ? '#fff' : '#000',
      backgroundColor: dark ? '#222' : '#fff',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    error: {
      color: '#ff6b6b',
      marginBottom: 10,
    },
    pickButton: {
      marginVertical: 8,
      backgroundColor: dark ? '#0a84ff' : '#007bff',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: dark ? '#0a84ff' : '#007bff',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 3,
    },
    pickButtonText: {
      color: 'white',
      fontWeight: '600',
    },
    imagePreviewContainer: {
      marginVertical: 8,
      flexDirection: 'row',
    },
    imageWrapper: {
      marginRight: 8,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageThumbnail: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    removeImageText: {
      position: 'absolute',
      top: 4,
      right: 4,
      backgroundColor: 'rgba(255,0,0,0.7)',
      color: 'white',
      borderRadius: 12,
      paddingHorizontal: 6,
      paddingVertical: 0,
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 18,
      overflow: 'hidden',
    },
    submitButton: {
      marginTop: 24,
      backgroundColor: dark ? '#28a745' : '#28a745',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '#28a745',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 3,
    },
    submitButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
  });

export default AddProductForm;
