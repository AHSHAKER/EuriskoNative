// api/products.ts
import axios from 'axios';

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

  const res = await axios.post('https://your-api-url.com/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
