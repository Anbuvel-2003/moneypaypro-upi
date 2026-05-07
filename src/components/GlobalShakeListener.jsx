import React, { useEffect } from 'react';
import RNShake from 'react-native-shake';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';

const GlobalShakeListener = () => {
  const navigation = useNavigation();
  const { shakeToScan } = useSettings();

  useEffect(() => {
    let subscription;
    
    // Only add listener if shakeToScan is enabled
    if (shakeToScan) {
      subscription = RNShake.addListener(() => {
        // Navigate to the Scan screen
        navigation.navigate('Scan');
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [shakeToScan, navigation]);

  // This component doesn't render anything
  return null;
};

export default GlobalShakeListener;
