import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Linking, NativeModules, Platform, StyleSheet } from 'react-native';
import { AlertTriangle, Settings, XCircle } from 'lucide-react-native';
import GlassBottomSheet from './GlassBottomSheet';
import GlassView from './GlassView';

const { DevModeModule } = NativeModules;

const DeveloperModeModal = () => {
  const bottomSheetRef = useRef(null);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    const checkDevMode = async () => {
      try {
        if (DevModeModule) {
          const enabled = await DevModeModule.isDevModeEnabled();
          setIsDevMode(enabled);
          if (enabled) {
            bottomSheetRef.current?.expand();
          }
        }
      } catch (error) {
        console.error('Error checking dev mode:', error);
      }
    };

    checkDevMode();
  }, []);

  const handleCancel = () => {
    // Close the app
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      // On iOS, we can't really close the app programmatically easily (not recommended)
      // but we'll try to just hide the app or show it's disabled.
      // Most apps use a mandatory alert that can't be dismissed.
      Alert.alert("Development Mode", "Please disable development mode to use this app.");
    }
  };

  const handleGoToSettings = () => {
    if (Platform.OS === 'android') {
      // Open developer settings directly if possible, or general settings
      Linking.openSettings();
    } else {
      Linking.openURL('app-settings:');
    }
  };

  if (!isDevMode) return null;

  return (
    <GlassBottomSheet
      ref={bottomSheetRef}
      snapPoints={['40%']}
      enablePanDownToClose={false} // Prevent user from closing manually if dev mode is on
    >
      <View className="flex-1 items-center justify-between pb-4">
        <View className="items-center">
          <View className="bg-yellow-500/20 p-4 rounded-full mb-4">
            <AlertTriangle size={48} color="#EAB308" />
          </View>
          
          <Text className="text-white text-2xl font-bold mb-2">Developer Mode ON</Text>
          <Text className="text-white/70 text-center px-4 leading-6">
            Security restricted. Your device has Developer Mode enabled, which might pose a security risk. Please turn it off in Settings to continue using MoneyPay Pro.
          </Text>
        </View>

        <View className="flex-row w-full gap-4 px-2">
          <TouchableOpacity 
            onPress={handleCancel}
            activeOpacity={0.7}
            className="flex-1 overflow-hidden rounded-2xl"
          >
            <GlassView className="flex-row items-center justify-center p-4 bg-white/5 border-white/10">
              <XCircle size={20} color="#fff" style={{ marginRight: 8, opacity: 0.7 }} />
              <Text className="text-white font-semibold">Exit App</Text>
            </GlassView>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleGoToSettings}
            activeOpacity={0.7}
            className="flex-1 overflow-hidden rounded-2xl"
          >
            <GlassView className="flex-row items-center justify-center p-4 bg-yellow-500/20 border-yellow-500/30">
              <Settings size={20} color="#EAB308" style={{ marginRight: 8 }} />
              <Text className="text-yellow-500 font-semibold">Go Settings</Text>
            </GlassView>
          </TouchableOpacity>
        </View>
      </View>
    </GlassBottomSheet>
  );
};

export default DeveloperModeModal;
