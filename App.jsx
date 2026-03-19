import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <BottomTabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;