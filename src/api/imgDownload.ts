import axios from 'axios';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return global.btoa(binary); // React Native supports btoa
}

const downloadImageWithAxios = async (imageUrl: string) => {
  try {
    const fileName = `${Date.now()}.jpg`;
    const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    // Ensure the directory exists
    await RNFS.mkdir(RNFS.DownloadDirectoryPath);

    // Get image as arraybuffer
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    // Convert array buffer to base64
    const base64Data = arrayBufferToBase64(response.data);

    // Write file as base64
    await RNFS.writeFile(filePath, base64Data, 'base64');

    Alert.alert('Saved', 'Image saved to your Downloads folder.');
  } catch (err) {
    console.log('Download error:', err);
    Alert.alert('Error', 'Failed to save image.');
  }
};

export default downloadImageWithAxios;
