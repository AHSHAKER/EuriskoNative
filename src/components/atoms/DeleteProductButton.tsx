import React from 'react';
import {TouchableOpacity, StyleSheet, Alert} from 'react-native';
import CustomText from '../atoms/CustomText';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../store/AuthStore';
import {deleteProduct} from '../../api/products';

type Props = {
  productId: string;
};

const DeleteProductButton = ({productId}: Props) => {
  const navigation = useNavigation();
  const accessToken = useAuthStore(state => state.accessToken);

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!accessToken) {
                Alert.alert(
                  'Error',
                  'You are not authorized to delete this product.',
                );
                return;
              }

              await deleteProduct(accessToken, productId);

              Alert.alert('Deleted', 'Product has been deleted.');
              navigation.goBack();
            } catch (err) {
              console.error('Failed to delete product:', err);
              Alert.alert('Error', 'Could not delete the product.');
            }
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleDelete}>
      <CustomText weight="bold" style={styles.text}>
        Delete
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
  },
});

export default DeleteProductButton;
