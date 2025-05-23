import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../atoms/CustomText';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MainStackParamList} from '../../navigator/Types';
type Props = {
  productId: string;
};
const EditProductButton = ({productId}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleEdit = () => {
    navigation.navigate('EditProduct', {productId});
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleEdit}>
      <CustomText weight="bold" style={styles.text}>
        Edit
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  text: {
    color: '#fff',
  },
});

export default EditProductButton;
