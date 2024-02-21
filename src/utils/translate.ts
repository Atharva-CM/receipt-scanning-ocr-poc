import axios from 'axios';

export const translateText = async (text: string, targetLanguage = 'en') => {
  const apiKey = process.env.TRANSLATE_API_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const request = {
    q: text,
    target: targetLanguage,
  };

  try {
    const response = await axios.post(url, request);
    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error('Error during translation:', error);
    return null;
  }
};
