import React, {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  CameraPermissionRequestResult,
  useCameraDevice,
} from 'react-native-vision-camera';

import {useAppState} from '@react-native-community/hooks/lib/useAppState';
import {NavigationProp, useIsFocused} from '@react-navigation/native';

import {convertToBase64} from '../utils/image';
import {performOCR} from '../utils/ocr';
import {translateText} from '../utils/translate';

type TCameraScreenProps = {
  navigation: NavigationProp<any>;
};

const CameraScreen: FC<TCameraScreenProps> = ({navigation}) => {
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const appState = useAppState();

  const camera = useRef<Camera>(null);

  const isActive = isFocused && appState === 'active';

  const [cameraPermission, setCameraPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus: CameraPermissionRequestResult =
        await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus === 'granted');
    })();
  }, []);

  if (!device || !cameraPermission) {
    return <View />;
  }

  const takePicture = async () => {
    try {
      const photo = await camera.current?.takePhoto({
        qualityPrioritization: 'speed',
      });

      if (photo?.path) {
        const base64Image = await convertToBase64(photo.path);
        if (!base64Image) {
          return null;
        }
        const ocrText = await performOCR(base64Image);
        // const ocrText = await performOCRTesseract(base64Image);
        console.log('ocrText: ', ocrText);
        if (!ocrText) {
          return null;
        }
        const translatedText = await translateText(ocrText);
        console.log('translatedText: ', translatedText);

        navigation.navigate('DataReview', {ocrText: translatedText});
      }
    } catch (error) {
      console.error('Error taking picture: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={isActive}
        photo={true}
      />
      <TouchableOpacity onPress={takePicture} style={styles.capture}>
        <Text style={styles.captureText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  capture: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 'auto',
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 20,
    fontSize: 100,
  },
  captureText: {
    color: 'black',
  },
});

export default CameraScreen;
