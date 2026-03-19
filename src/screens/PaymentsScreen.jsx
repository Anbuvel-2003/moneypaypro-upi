import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { 
  QrCode, 
  User, 
  Smartphone, 
  Landmark, 
  History, 
  Plus, 
  Send,
  Wallet,
  Search
} from 'lucide-react-native';
import { useTabBarVisibility } from '../navigation/TabBarVisibilityContext';
import GlassView from '../components/GlassView';
import SectionHeader from '../components/home/SectionHeader';
import CategoryItem from '../components/home/CategoryItem';
import PromoBanner from '../components/home/PromoBanner';

const PaymentsScreen = () => {
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
  const quickActions = [
    { label: 'Scan QR', icon: <QrCode size={28} color="#9D174D" />, bgColor: 'bg-primary/10' },
    { label: 'Contacts', icon: <User size={28} color="#9D174D" />, bgColor: 'bg-primary/10' },
    { label: 'Mobile', icon: <Smartphone size={28} color="#9D174D" />, bgColor: 'bg-primary/10' },
    { label: 'Bank', icon: <Landmark size={28} color="#9D174D" />, bgColor: 'bg-primary/10' },
  ];

  const bankAccounts = [
    { bankName: 'HDFC Bank', accNo: 'XXXX 1234', initial: 'H', bgColor: 'bg-blue-600/20' },
    { bankName: 'ICICI Bank', accNo: 'XXXX 5678', initial: 'I', bgColor: 'bg-orange-600/20' },
    { bankName: 'SBI Bank', accNo: 'XXXX 9012', initial: 'S', bgColor: 'bg-indigo-600/20' },
  ];

  return (
    <View className="flex-1 bg-[#0B0D0F]">
      <Animated.ScrollView 
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16, paddingTop: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8 px-1">
          <View>
            <Text className="text-white/40 text-sm font-medium">MoneyPay</Text>
            <Text className="text-white text-3xl font-bold">Payments</Text>
          </View>
          <GlassView className="p-2 rounded-2xl bg-white/5 border-white/5">
            <History size={24} color="#fff" />
          </GlassView>
        </View>

        {/* Balance Card */}
        <GlassView className="p-6 rounded-[32px] bg-primary/20 border-white/10 mb-8 overflow-hidden">
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-white/60 text-xs mb-1">Your Balance</Text>
              <Text className="text-white text-3xl font-bold">₹12,450.00</Text>
            </View>
            <View className="w-12 h-12 rounded-2xl bg-white/10 items-center justify-center">
              <Wallet size={24} color="#fff" />
            </View>
          </View>
          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-1 bg-white flex-row items-center justify-center py-3 rounded-2xl">
              <Send size={18} color="#000" className="mr-2" />
              <Text className="text-black font-bold">Send</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white/10 flex-row items-center justify-center py-3 rounded-2xl border border-white/20">
              <Plus size={18} color="#fff" className="mr-2" />
              <Text className="text-white font-bold">Add</Text>
            </TouchableOpacity>
          </View>
        </GlassView>

        {/* UPI ID Section */}
        <View className="flex-row items-center justify-center mb-8">
            <Text className="text-white/40 text-xs mr-2">UPI ID:</Text>
            <Text className="text-primary text-xs font-bold">moneypay@upi</Text>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-8 px-1">
          {quickActions.map((action, index) => (
            <View key={index} className="items-center">
              <GlassView className="w-16 h-16 rounded-2xl items-center justify-center mb-2 border-white/5 bg-white/5">
                {action.icon}
              </GlassView>
              <Text className="text-white/60 text-[11px] font-medium">{action.label}</Text>
            </View>
          ))}
        </View>

        {/* Bank Details */}
        <SectionHeader title="Bank accounts" />
        <View className="mb-8">
          {bankAccounts.map((bank, index) => (
            <TouchableOpacity 
              key={index} 
              className="flex-row items-center justify-between py-4 border-b border-white/5"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <GlassView className={`w-12 h-12 rounded-full border border-white/5 items-center justify-center mr-4 ${bank.bgColor}`}>
                    <Text className="text-white font-bold text-lg">{bank.initial}</Text>
                </GlassView>
                <View>
                  <Text className="text-white font-bold text-base">{bank.bankName}</Text>
                  <Text className="text-white/40 text-xs">{bank.accNo}</Text>
                </View>
              </View>
              <TouchableOpacity className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl">
                <Text className="text-primary font-bold text-xs">Check balance</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity className="flex-row items-center py-6">
            <View className="w-12 h-12 rounded-full bg-slate-800 items-center justify-center mr-4 border border-white/5">
                <Plus size={24} color="#fff" />
            </View>
            <Text className="text-white font-medium">Add bank account</Text>
          </TouchableOpacity>
        </View>

        {/* Offers Section */}
        <PromoBanner 
          title="Weekend Cashback Offer"
          subtitle="Get up to ₹100 cashback on your next 3 UPI payments"
          actionText="Claim Now"
        />

        <View className="h-40" />
      </Animated.ScrollView>
    </View>
  );
};

export default PaymentsScreen;
