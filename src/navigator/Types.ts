export type AuthStackParamList = {
    SignUp: undefined;
    Login: undefined;
    OTP: { from: string };
    Done: { from: string };
  };
  
export type MainStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: String };
};