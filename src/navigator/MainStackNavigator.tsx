import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {MainStackParamList} from './Types';
import {useTheme} from '../context/ThemeContext';
import ProductListScreen from '../screens/AppScreens/ProductListScreen';
import HeaderTitle from '../components/atoms/HeaderTitle';
import ProductDetailsScreen from '../screens/AppScreens/ProductDetailsScreen';
import AddProductScreen from '../screens/AppScreens/AddProductScreen';
import EditProductScreen from '../screens/AppScreens/EditProductScreen';

const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  const {theme} = useTheme();
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.header,
          },
          headerTintColor: theme.text,
          headerTitle: () => <HeaderTitle />,
        }}
      />
      <MainStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
