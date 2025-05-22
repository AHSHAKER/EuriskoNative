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
