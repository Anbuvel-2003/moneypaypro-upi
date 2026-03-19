import React, { useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useTabBarVisibility } from '../navigation/TabBarVisibilityContext';
import GlassView from '../components/GlassView';
import GlassBottomSheet from '../components/GlassBottomSheet';

const HomeScreen = () => {
  const bottomSheetRef = useRef(null);
  const { hideTabBar, showTabBar } = useTabBarVisibility();
  const lastScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
        hideTabBar();
      } else if (currentScrollY < lastScrollY.value) {
        showTabBar();
      }
      lastScrollY.value = currentScrollY;
    },
  });

  const handlePresentModalPress = () => bottomSheetRef.current?.expand();

  return (
    <View className="flex-1 bg-slate-950">
      <Animated.ScrollView 
        className="flex-1 p-4"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View className="mt-12 mb-6">
          <Text className="text-3xl font-bold text-white">Welcome back!</Text>
          <Text className="text-slate-400">Manage your payments with ease.</Text>
        </View>

        <GlassView className="p-6 mb-6">
          <Text className="text-slate-400 mb-1">Total Balance</Text>
          <Text className="text-4xl font-bold text-white">$12,450.00</Text>
          <View className="flex-row mt-6 justify-between">
            <TouchableOpacity 
              onPress={handlePresentModalPress}
              className="bg-blue-600 px-6 py-3 rounded-2xl"
            >
              <Text className="text-white font-semibold">Send Money</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
              <Text className="text-white font-semibold">Add Cash</Text>
            </TouchableOpacity>
          </View>
        </GlassView>

        <Text className="text-xl font-bold text-white mb-4">Bills & Recharges</Text>
        <Animated.ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row mb-8"
        >
          {[
            { name: 'Mobile', icon: '📱' },
            { name: 'DTH', icon: '📡' },
            { name: 'Electricity', icon: '💡' },
            { name: 'Water', icon: '💧' },
            { name: 'Fastag', icon: '🚗' },
            { name: 'Internet', icon: '🌐' },
            { name: 'Credit Card', icon: '💳' },
          ].map((item, idx) => (
            <View key={idx} className="items-center mr-6">
              <TouchableOpacity className="w-16 h-16 bg-slate-900 rounded-2xl items-center justify-center border border-white/5 mb-2">
                <Text className="text-2xl">{item.icon}</Text>
              </TouchableOpacity>
              <Text className="text-slate-400 text-[10px]">{item.name}</Text>
            </View>
          ))}
        </Animated.ScrollView>

        <Text className="text-xl font-bold text-white mb-4">Recent Transactions</Text>
        {[
          { name: 'Starbucks Coffee', date: 'Today, 10:24 AM', amount: '-$4.50', icon: '☕' },
          { name: 'Apple Music', date: 'Yesterday, 08:30 PM', amount: '-$9.99', icon: '🎵' },
          { name: 'Salary Deposit', date: '15 Mar, 09:00 AM', amount: '+$4,200.00', icon: '💰', color: 'text-emerald-500' },
          { name: 'Amazon Store', date: '14 Mar, 02:15 PM', amount: '-$124.50', icon: '📦' },
          { name: 'Uber Trip', date: '14 Mar, 11:45 AM', amount: '-$12.20', icon: '🚗' },
        ].map((item, i) => (
          <GlassView key={i} className="flex-row items-center p-4 mb-3">
            <View className="w-12 h-12 bg-white/5 rounded-xl items-center justify-center mr-4">
              <Text className="text-xl">{item.icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold">{item.name}</Text>
              <Text className="text-slate-500 text-xs">{item.date}</Text>
            </View>
            <Text className={`font-bold ${item.color || 'text-white'}`}>{item.amount}</Text>
          </GlassView>
        ))}
        <View className="h-40" />
      </Animated.ScrollView>

      <GlassBottomSheet ref={bottomSheetRef}>
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl">✓</Text>
          </View>
          <Text className="text-2xl font-bold text-white">Payment Alert</Text>
          <Text className="text-slate-400 text-center mt-2">
            Are you sure you want to send $50.00 to John Doe?
          </Text>
        </View>
        <TouchableOpacity className="bg-blue-600 py-4 rounded-3xl w-full items-center mb-3">
          <Text className="text-white font-bold text-lg">Confirm Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white/5 py-4 rounded-3xl w-full items-center border border-white/10">
          <Text className="text-white font-semibold">Cancel</Text>
        </TouchableOpacity>
      </GlassBottomSheet>
    </View>
  );
};

export default HomeScreen;
