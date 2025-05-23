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

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: { url: string }[];
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
  user: {
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

