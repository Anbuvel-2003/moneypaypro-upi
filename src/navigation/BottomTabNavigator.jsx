import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScanScreen from '../screens/ScanScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const Placeholder = ({ name }) => (
  <View className="flex-1 bg-slate-950 items-center justify-center">
    <Text className="text-white text-2xl font-bold">{name} Screen</Text>
    <Text className="text-slate-400 mt-2">Coming Soon</Text>
  </View>
);

import { TabBarVisibilityProvider } from './TabBarVisibilityContext';

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
        <Tab.Screen name="Payments" component={() => <Placeholder name="Payments" />} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="History" component={() => <Placeholder name="History" />} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </TabBarVisibilityProvider>
  );
};

export default BottomTabNavigator;
