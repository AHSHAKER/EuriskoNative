import axios from 'axios';

const BASE_URL = 'https://backend-practice.eurisko.me/api';

export const getUserProfile = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async (
  token: string,
  data: { firstName: string; lastName: string; profileImage?: any }
) => {
  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  if (data.profileImage) {
    formData.append('profileImage', data.profileImage as any);
  }

  const response = await axios.put(`${BASE_URL}/user/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
