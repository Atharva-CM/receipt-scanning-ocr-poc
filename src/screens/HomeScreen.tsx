import React, {FC, useEffect, useState} from 'react';
import {Button, FlatList, ListRenderItem, StyleSheet, View} from 'react-native';

import {NavigationProp} from '@react-navigation/native';

import ReceiptListItem from '../components/ReceiptListItem';
import {getData, storeData} from '../services/DataStorage';
import {Receipt} from '../types/receipt';

type THomeScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: FC<THomeScreenProps> = ({navigation}) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const handleItemPress = (id: string) => {
    navigation.navigate('ReceiptDetail', {receiptId: id});
  };

  useEffect(() => {
    const loadReceipts = async () => {
      const storedReceipts = (await getData('receipts')) || [];
      setReceipts(storedReceipts);
    };

    loadReceipts();
  }, []);

  const handleDelete = async (id: string) => {
    const updatedReceipts = receipts.filter(receipt => receipt.id !== id);
    setReceipts(updatedReceipts);
    await storeData('receipts', updatedReceipts); // Update stored data
  };

  const handleEdit = (id: string) => {
    const receiptToEdit = receipts.find(receipt => receipt.id === id);
    if (receiptToEdit) {
      navigation.navigate('EditReceipt', {receipt: receiptToEdit});
    }
  };

  const renderItem: ListRenderItem<Receipt> = ({item}) => (
    <ReceiptListItem
      item={item}
      onPressItem={handleItemPress}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
  console.log('receipts: ', receipts);

  return (
    <View style={styles.container}>
      <FlatList
        data={receipts}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <Button
        title="Scan New Receipt"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
