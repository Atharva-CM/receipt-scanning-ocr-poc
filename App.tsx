import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CameraScreen from './src/screens/CameraScreen';
import DataReviewScreen from './src/screens/DataReviewScreen';
import EditReceiptScreen from './src/screens/EditReceiptScreen';
import HomeScreen from './src/screens/HomeScreen';
import {Receipt} from './src/types/receipt';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  DataReview: {ocrText: string};
  EditReceipt: {receipt: Receipt};
  ReceiptDetail: {receiptId: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="DataReview" component={DataReviewScreen} />
        <Stack.Screen name="EditReceipt" component={EditReceiptScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
