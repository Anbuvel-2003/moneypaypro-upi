import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/MainNavigator';
import { StatusBar } from 'react-native';
import DeveloperModeModal from './src/components/DeveloperModeModal';
import PermissionManager from './src/utils/PermissionManager';
import OfflineNotice from './src/components/OfflineNotice';
import { LanguageProvider } from './src/context/SettingsContext';
import GlobalShakeListener from './src/components/GlobalShakeListener';

const App = () => {
  return (
    <LanguageProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <MainNavigator />
          <DeveloperModeModal />
          <PermissionManager />
          <OfflineNotice />
          <GlobalShakeListener />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    </LanguageProvider>
  );
};

export default App;