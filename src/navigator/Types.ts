import { Product } from '../data/Products';

export type RootStackParamList = {
    SignUp: undefined;
    Login: undefined;
    Done: { from: string };
  };
  
export type MainStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: Product };
};