import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {Receipt} from '../types/receipt';
import {getData, storeData} from '../services/DataStorage';

type DataReviewRouteParams = {
  DataReview: {
    receipt: Receipt;
  };
};

type EditReceiptScreenProps = {
  navigation: NavigationProp<any>;
};

const EditReceiptScreen: React.FC<EditReceiptScreenProps> = () => {
  const route = useRoute<RouteProp<DataReviewRouteParams, 'DataReview'>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const {id: receiptId, text} = route.params.receipt;
  const [receiptText, setReceiptText] = useState(text);

  const handleSave = async () => {
    const receipts = (await getData('receipts')) || [];
    const updatedReceipts = receipts.map((receipt: Receipt) =>
      receipt.id === receiptId ? {...receipt, text: receiptText} : receipt,
    );

    await storeData('receipts', updatedReceipts);
    Alert.alert('Success', 'Receipt updated successfully');
    navigation.goBack();
  };

  useEffect(() => {
    const fetchReceipt = async () => {
      const receipts = (await getData('receipts')) || [];
      const receipt = receipts.find((r: Receipt) => r.id === receiptId);
      if (receipt) {
        setReceiptText(receipt.text);
      }
    };

    fetchReceipt();
  }, [receiptId]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setReceiptText}
        // Add other inputs for different properties
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
  // Add styles for other elements
});

export default EditReceiptScreen;
