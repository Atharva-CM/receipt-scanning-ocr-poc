import 'react-native-get-random-values';

import React, {FC, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {v4 as uuidv4} from 'uuid';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {getData, storeData} from '../services/DataStorage';

type DataReviewRouteParams = {
  DataReview: {
    ocrText: string;
  };
};

type TDataReviewScreenProps = {
  navigation: NavigationProp<any>;
};

const DataReviewScreen: FC<TDataReviewScreenProps> = () => {
  const route = useRoute<RouteProp<DataReviewRouteParams, 'DataReview'>>();
  const navigation = useNavigation<NavigationProp<any>>();

  const [text, setText] = useState(route.params?.ocrText || '');

  const handleSave = async () => {
    try {
      // Logic to save the edited text
      const existingReceipts = (await getData('receipts')) || [];

      const newReceipt = {
        id: uuidv4(), // Generate a unique ID
        text: text, // Assuming 'text' is the state variable holding the receipt text
        date: new Date().toISOString(), // Store the current date and time
      };

      const updatedReceipts = [...existingReceipts, newReceipt];
      console.log('updatedReceipts: ', updatedReceipts);
      await storeData('receipts', updatedReceipts);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={text}
        onChangeText={setText}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    color: 'black',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    color: 'black',
  },
});

export default DataReviewScreen;
