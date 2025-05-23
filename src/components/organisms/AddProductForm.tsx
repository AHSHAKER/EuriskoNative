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

const AddProductForm = () => {
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
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Cannot access gallery.');
      return;
    }

    launchImageLibrary({mediaType: 'photo', selectionLimit: 5}, res => {
      if (res.assets) {
        const imageUris = res.assets.map(a => a.uri);
        setLocalImages(res.assets);
        setValue('images', imageUris as string[]);
      }
    });
  };

  const onSubmit = async (form: ProductFormData) => {
    try {
      const payload = {
        title: form.name,
        description: form.description,
        price: parseFloat(form.price as any),
        location: {
          name: 'Default Location',
          latitude: 36.8065,
          longitude: 10.1815,
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
    <ScrollView contentContainerStyle={styles.container}>
      <CustomText style={styles.label}>Name</CustomText>
      <Controller
        control={control}
        name="name"
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Product name"
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
            <Image
              key={i}
              source={{uri: img.uri}}
              style={styles.imageThumbnail}
            />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}>
        <CustomText style={styles.submitButtonText}>Submit Product</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  pickButton: {
    marginVertical: 8,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  pickButtonText: {
    color: 'white',
  },
  imagePreviewContainer: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
});

export default AddProductForm;
