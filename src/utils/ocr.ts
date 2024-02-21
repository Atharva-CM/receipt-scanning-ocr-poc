import axios from 'axios';
import Tesseract from 'tesseract.js';

export const performOCR = async (imageData: string) => {
  const apiKey = process.env.OCR_API_KEY;
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const request = {
    requests: [
      {
        image: {
          content: imageData,
        },
        features: [
          {
            type: 'TEXT_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, request);
    const text = response.data.responses[0]?.fullTextAnnotation.text || '';
    return text;
  } catch (error) {
    // @ts-ignore
    console.error('Error during OCR:', error.response?.data || error);
    return null;
  }
};

export const performOCRTesseract = async (imageData: string) => {
  try {
    const result = await Tesseract.recognize(
      imageData,
      'eng', // Specify the language as needed
      {
        logger: m => console.log(m), // Optional: Log progress
      },
    );
    return result.data.text;
  } catch (error) {
    console.error('Error during OCR with Tesseract:', error);
    return null;
  }
};
