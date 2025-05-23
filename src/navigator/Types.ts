export type AuthStackParamList = {
    SignUp: undefined;
    Login: undefined;
    OTP: { from: 'Login' | 'SignUp'; email: string };
  };
  
export type MainStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: String };
  AddProduct: undefined;
};

