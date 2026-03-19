import React, { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { getItem, saveItem } from './secureStorage';
import { request, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';

const FIRST_LAUNCH_KEY = 'app_first_launch_done';

const PermissionManager = () => {
  useEffect(() => {
    const checkAndRequestPermissions = async () => {
      try {
        const hasLaunched = await getItem(FIRST_LAUNCH_KEY);
        
        if (hasLaunched === null) {
          // It's the first launch
          console.log('First launch detected. Requesting permissions...');
          
          if (Platform.OS === 'android') {
            await requestAndroidPermissions();
          } else if (Platform.OS === 'ios') {
            await requestIosPermissions();
          }
          
          // Mark as launched
          await saveItem(FIRST_LAUNCH_KEY, 'true');
        }
      } catch (error) {
        console.error('Error in PermissionManager:', error);
      }
    };

    checkAndRequestPermissions();
  }, []);

  const requestAndroidPermissions = async () => {
    const permissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_CONTACTS,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
      PERMISSIONS.ANDROID.READ_SMS,
      PERMISSIONS.ANDROID.RECEIVE_SMS,
    ];

    // Android 13+ notification permission
    if (Platform.Version >= 33) {
      permissions.push(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    }

    const statuses = await requestMultiple(permissions);
    console.log('Android Permission Statuses:', statuses);
  };

  const requestIosPermissions = async () => {
    const permissions = [
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.CONTACTS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      // Notifications are handled differently on iOS usually but react-native-permissions can handle it
    ];

    const statuses = await requestMultiple(permissions);
    console.log('iOS Permission Statuses:', statuses);
  };

  return null; // This component doesn't render anything
};

export default PermissionManager;
