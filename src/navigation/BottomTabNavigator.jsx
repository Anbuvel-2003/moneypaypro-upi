import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScanScreen from '../screens/ScanScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CustomTabBar from './CustomTabBar';
import { TabBarVisibilityProvider } from './TabBarVisibilityContext';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <TabBarVisibilityProvider>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </TabBarVisibilityProvider>
  );
};

export default BottomTabNavigator;
