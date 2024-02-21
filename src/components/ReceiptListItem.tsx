import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {Receipt} from '../types/receipt';

type ReceiptListItemProps = {
  item: Receipt;
  onPressItem: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const ReceiptListItem: React.FC<ReceiptListItemProps> = ({
  item,
  onPressItem,
  onDelete,
  onEdit,
}) => {
  const renderRightActions = () => {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={styles.deleteAction}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onEdit(item.id)}
          style={styles.editAction}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={() => onPressItem(item.id)}
        style={styles.container}>
        {/* <Image source={{uri: item.thumbnailUri}} style={styles.thumbnail} /> */}
        <View style={styles.infoContainer}>
          <Text style={styles.mainText}>{item.text}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  deleteAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    // Define width, padding, etc.
  },
  editAction: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    // Define width, padding, etc.
  },
});

export default ReceiptListItem;
