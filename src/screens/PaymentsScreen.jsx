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
import { useSettings } from '../context/SettingsContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PaymentsScreen = () => {
  const { hideTabBar, showTabBar } = useTabBarVisibility();
  const { colors, isDark } = useSettings();
  const lastScrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();

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
    { label: 'Scan QR', icon: <QrCode size={28} color={colors.primary} />, bgColor: 'bg-primary/10' },
    { label: 'Contacts', icon: <User size={28} color={colors.primary} />, bgColor: 'bg-primary/10' },
    { label: 'Mobile', icon: <Smartphone size={28} color={colors.primary} />, bgColor: 'bg-primary/10' },
    { label: 'Bank', icon: <Landmark size={28} color={colors.primary} />, bgColor: 'bg-primary/10' },
  ];

  const bankAccounts = [
    { bankName: 'HDFC Bank', accNo: 'XXXX 1234', initial: 'H', bgColor: 'bg-blue-600/20' },
    { bankName: 'ICICI Bank', accNo: 'XXXX 5678', initial: 'I', bgColor: 'bg-orange-600/20' },
    { bankName: 'SBI Bank', accNo: 'XXXX 9012', initial: 'S', bgColor: 'bg-indigo-600/20' },
  ];

  return (
    <View style={{ backgroundColor: colors.background }} className="flex-1">
      <Animated.ScrollView 
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16, paddingTop: Math.max(insets.top + 10, 20) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8 px-1">
          <View>
            <Text style={{ color: colors.textSecondary }} className="text-sm font-medium">MoneyPay</Text>
            <Text style={{ color: colors.text }} className="text-3xl font-bold">Payments</Text>
          </View>
          <GlassView className="p-2 rounded-2xl">
            <History size={24} color={colors.text} />
          </GlassView>
        </View>

        {/* Balance Card */}
        <GlassView 
            style={{ 
                backgroundColor: isDark ? 'rgba(157, 23, 77, 0.2)' : 'rgba(157, 23, 77, 0.05)', 
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(157, 23, 77, 0.1)' 
            }} 
            className="p-6 rounded-[32px] border mb-8 overflow-hidden"
        >
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text style={{ color: colors.textSecondary }} className="text-xs mb-1">Your Balance</Text>
              <Text style={{ color: colors.text }} className="text-3xl font-bold">₹12,450.00</Text>
            </View>
            <View 
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(157, 23, 77, 0.1)' }} 
                className="w-12 h-12 rounded-2xl items-center justify-center"
            >
              <Wallet size={24} color={isDark ? '#fff' : colors.primary} />
            </View>
          </View>
          <View className="flex-row gap-4">
            <TouchableOpacity 
                style={{ backgroundColor: colors.text }} 
                className="flex-1 flex-row items-center justify-center py-3 rounded-2xl"
            >
              <Send size={18} color={colors.background} className="mr-2" />
              <Text style={{ color: colors.background }} className="font-bold">Send</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' 
                }} 
                className="flex-1 flex-row items-center justify-center py-3 rounded-2xl border"
            >
              <Plus size={18} color={colors.text} className="mr-2" />
              <Text style={{ color: colors.text }} className="font-bold">Add</Text>
            </TouchableOpacity>
          </View>
        </GlassView>

        {/* UPI ID Section */}
        <View className="flex-row items-center justify-center mb-8">
            <Text style={{ color: colors.textSecondary }} className="text-xs mr-2">UPI ID:</Text>
            <Text style={{ color: colors.primary }} className="text-xs font-bold">moneypay@upi</Text>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-8 px-1">
          {quickActions.map((action, index) => (
            <View key={index} className="items-center">
              <GlassView className="w-16 h-16 rounded-2xl items-center justify-center mb-2">
                {action.icon}
              </GlassView>
              <Text style={{ color: colors.textSecondary }} className="text-[11px] font-medium">{action.label}</Text>
            </View>
          ))}
        </View>

        {/* Bank Details */}
        <SectionHeader title="Bank accounts" />
        <View className="mb-8">
          {bankAccounts.map((bank, index) => (
            <TouchableOpacity 
              key={index} 
              style={{ borderBottomColor: colors.border }} 
              className="flex-row items-center justify-between py-4 border-b"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <GlassView className={`w-12 h-12 rounded-full border items-center justify-center mr-4 ${bank.bgColor}`}>
                    <Text style={{ color: isDark ? '#fff' : colors.primary }} className="font-bold text-lg">{bank.initial}</Text>
                </GlassView>
                <View>
                  <Text style={{ color: colors.text }} className="font-bold text-base">{bank.bankName}</Text>
                  <Text style={{ color: colors.textSecondary }} className="text-xs">{bank.accNo}</Text>
                </View>
              </View>
              <TouchableOpacity style={{ backgroundColor: isDark ? 'rgba(157, 23, 77, 0.1)' : 'rgba(157, 23, 77, 0.05)', borderColor: isDark ? 'rgba(157, 23, 77, 0.2)' : 'rgba(157, 23, 77, 0.1)' }} className="border px-4 py-2 rounded-xl">
                <Text style={{ color: colors.primary }} className="font-bold text-xs">Check balance</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity className="flex-row items-center py-6">
            <View 
                style={{ 
                    backgroundColor: isDark ? '#1e293b' : '#f1f5f9', 
                    borderColor: colors.border 
                }} 
                className="w-12 h-12 rounded-full items-center justify-center mr-4 border"
            >
                <Plus size={24} color={colors.text} />
            </View>
            <Text style={{ color: colors.text }} className="font-medium">Add bank account</Text>
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
