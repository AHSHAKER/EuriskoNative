import axios from 'axios';

const BASE_URL = 'https://backend-practice.eurisko.me/api';

export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const [firstName, ...rest] = data.name.trim().split(' ');
  const lastName = rest.join(' ') || '-';

  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('phoneNumber', data.phone);

  const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email: data.email,
    password: data.password,
  });
  return response.data;
};

export const resendOTP = async (email: string) => {
  const response = await axios.post(
    `${BASE_URL}/auth/resend-verification-otp`,
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const verifyEmailOtp = async (email: string, otp: string) => {
  console.log('Sending JSON payload:', { email, otp });

  const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
    email,
    otp,
  });

  return response.data;
};