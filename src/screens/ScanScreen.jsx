import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import ScannerView from '../components/scan/ScannerView';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const navigation = useNavigation();
  const { colors } = useSettings();

  useEffect(() => {
    const checkPermission = async () => {
      const status = await Camera.getCameraPermissionStatus();
      if (status === 'granted') {
        setHasPermission(true);
      } else if (status === 'not-determined') {
        const newStatus = await Camera.requestCameraPermission();
        setHasPermission(newStatus === 'granted');
      } else {
        Alert.alert(
          'Camera Permission',
          'MoneyPay Pro needs camera access to scan QR codes. Please enable it in settings.',
          [
            { text: 'Cancel', onPress: () => navigation.goBack(), style: 'cancel' },
            { text: 'Open Settings', onPress: () => navigation.openSettings() },
          ]
        );
      }
    };

    checkPermission();
  }, [navigation]);

  const handleCodeScanned = (code) => {
    if (isScanning) {
      setIsScanning(false);
      console.log('QR Code Scanned:', code);
      
      // Navigate to payment or show result
      Alert.alert('Scan Result', `Scanned Value: ${code}`, [
        { text: 'OK', onPress: () => setIsScanning(true) }
      ]);
    }
  };

  if (!hasPermission) {
    return (
      <View style={{ backgroundColor: colors.background }} className="flex-1 items-center justify-center p-6">
        <Text style={{ color: colors.text }} className="text-center mb-6">
          Camera permission is required to use the scanner.
        </Text>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: colors.primary }}
          className="px-8 py-3 rounded-2xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
       <ScannerView 
         onCodeScanned={handleCodeScanned} 
         onClose={() => navigation.goBack()}
       />
    </View>
  );
};

export default ScanScreen;
