import RNFS from 'react-native-fs';

export const convertToBase64 = async (uri: string) => {
  try {
    const fileContent = await RNFS.readFile(`file://${uri}`, 'base64');
    return `${fileContent}`;
  } catch (error) {
    console.error('Error converting image to base64', error);
    return null;
  }
};
