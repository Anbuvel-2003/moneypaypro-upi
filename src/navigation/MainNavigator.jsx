import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import RechargeBillsScreen from '../screens/RechargeBillsScreen';
import UPIDetailsScreen from '../screens/UPIDetailsScreen';
import SecurityScreen from '../screens/SecurityScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import ThemeScreen from '../screens/ThemeScreen';
import LanguageScreen from '../screens/LanguageScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="RechargeBills" component={RechargeBillsScreen} />
      <Stack.Screen name="UPIDetails" component={UPIDetailsScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="Theme" component={ThemeScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
