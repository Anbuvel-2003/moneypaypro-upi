import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { StatusBar } from 'react-native';
import DeveloperModeModal from './src/components/DeveloperModeModal';
import PermissionManager from './src/utils/PermissionManager';
import OfflineNotice from './src/components/OfflineNotice';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <BottomTabNavigator />
          <DeveloperModeModal />
          <PermissionManager />
          <OfflineNotice />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;