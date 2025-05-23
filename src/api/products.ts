import axios from 'axios';
import type { Product } from '../navigator/Types';

const API_BASE_URL = 'https://backend-practice.eurisko.me/api';

// ✅ Create Product
export const createProduct = async (
  accessToken: string,
  payload: {
    title: string;
    description: string;
    price: string | number;
    location: { name: string; longitude: number; latitude: number };
    images: { uri: string; type: string; name: string }[];
  }
) => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('description', payload.description);
  formData.append('price', String(payload.price));
  formData.append('location', JSON.stringify(payload.location));

  payload.images.forEach((img, i) => {
    formData.append('images', {
      uri: img.uri,
      type: img.type,
      name: img.name,
    } as any);
  });

  const res = await axios.post(`${API_BASE_URL}/products`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

// ✅ Get Products
export const getProducts = async (
  accessToken: string,
  {
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'price',
    order = 'desc',
  }: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  } = {}
): Promise<{
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalItems: number;
    limit: number;
  };
}> => {
  const res = await axios.get(`${API_BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      limit,
      sortBy,
      order,
      ...(search ? { search } : {}),
    },
  });

  return res.data;
};
