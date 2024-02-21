import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useRoute} from '@react-navigation/native';

import {getData} from '../services/DataStorage';
import {Receipt} from '../types/receipt';

const ReceiptDetailScreen: FC = () => {
  const route = useRoute();
  const {receiptId} = route.params as {receiptId: string};
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      const receipts = (await getData('receipts')) || [];
      const foundReceipt = receipts.find((r: Receipt) => r.id === receiptId);
      setReceipt(foundReceipt);
    };

    fetchReceipt();
  }, [receiptId]);

  if (!receipt) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Display the details of the receipt */}
      <Text>Receipt Details:</Text>
      <Text>{receipt.text}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  // ... other styles as needed
});

export default ReceiptDetailScreen;
