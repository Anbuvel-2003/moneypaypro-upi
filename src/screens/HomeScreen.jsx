import React, { useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { 
  Smartphone, 
  Tv, 
  Lightbulb, 
  Car, 
  History, 
  CreditCard, 
  ShieldCheck, 
  Landmark,
  Plus
} from 'lucide-react-native';
import { useTabBarVisibility } from '../navigation/TabBarVisibilityContext';
import GlassView from '../components/GlassView';
import GlassBottomSheet from '../components/GlassBottomSheet';

// Home Components
import SectionHeader from '../components/home/SectionHeader';
import CategoryItem from '../components/home/CategoryItem';
import PromoBanner from '../components/home/PromoBanner';
import ManageMoneyItem from '../components/home/ManageMoneyItem';

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

  const billsData = [
    { label: 'Jio Prepaid', bgColor: 'bg-primary' },
    { label: 'Airtel Prepaid', bgColor: 'bg-red-600' },
    { label: 'Vi Prepaid', bgColor: 'bg-rose-500' },
    { label: 'Google Play', bgColor: 'bg-white' },
    { label: 'Mobile recharge', icon: <Smartphone size={24} color="#9D174D" />, bgColor: 'bg-primary/10' },
    { label: 'DTH / Cable TV', icon: <Tv size={24} color="#9D174D" />, bgColor: 'bg-primary/10' },
    { label: 'Electricity', icon: <Lightbulb size={24} color="#9D174D" />, bgColor: 'bg-primary/10' },
    { label: 'FASTag recharge', icon: <Car size={24} color="#9D174D" />, bgColor: 'bg-primary/10' },
  ];

  const businessData = [
    { label: 'Sasikala L', bgColor: 'bg-orange-700' },
    { label: 'AROMA B...', bgColor: 'bg-slate-700' },
    { label: 'KANAKA...', bgColor: 'bg-stone-700' },
    { label: 'More', icon: <Plus size={24} color="#fff" />, bgColor: 'bg-slate-800' },
  ];

  return (
    <View className="flex-1 bg-[#0B0D0F]">
      <Animated.ScrollView 
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16, paddingTop: 60 }}
      >
        {/* Header Section (Simulated) */}
        <View className="mb-8 items-center">
            <View className="w-full flex-row justify-between items-center mb-6">
                <View className="w-10 h-10 rounded-full bg-slate-800" />
                <View className="flex-row gap-4">
                    <History size={24} color="#fff" />
                    <View className="w-8 h-8 rounded-full bg-slate-700" />
                </View>
            </View>
            <View className="w-full h-40 rounded-3xl bg-slate-900/50 border border-white/5 items-center justify-center">
                <Text className="text-white/40 mb-2">Scan any QR code</Text>
                <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center">
                    <Smartphone size={32} color="#fff" />
                </View>
            </View>
        </View>

        {/* Bills & Recharges */}
        <SectionHeader title="Bills & recharges" actionText="Manage" />
        <View className="flex-row flex-wrap justify-between px-1">
          {billsData.map((item, index) => (
            <CategoryItem 
              key={index}
              label={item.label}
              icon={item.icon}
              bgColor={item.bgColor}
            />
          ))}
        </View>

        {/* Businesses */}
        <SectionHeader title="Businesses" actionText="Explore" />
        <View className="flex-row justify-between px-1 mb-4">
          {businessData.map((item, index) => (
            <CategoryItem 
              key={index}
              label={item.label}
              icon={item.icon}
              bgColor={item.bgColor}
            />
          ))}
        </View>

        {/* Gift cards & more */}
        <SectionHeader title="Gift cards & more" />
        <View className="flex-row gap-4 mb-8">
          <GlassView className="flex-1 p-4 rounded-3xl bg-white/5 border-white/5">
            <View className="w-10 h-10 bg-primary/20 rounded-xl items-center justify-center mb-3">
              <Plus size={24} color="#9D174D" />
            </View>
            <Text className="text-white font-bold text-sm mb-1">Subscriptions</Text>
            <Text className="text-white/40 text-[10px]">Buy plans from</Text>
          </GlassView>
          <GlassView className="flex-1 p-4 rounded-3xl bg-white/5 border-white/5">
            <View className="w-10 h-10 bg-primary/20 rounded-xl items-center justify-center mb-3">
              <CreditCard size={24} color="#9D174D" />
            </View>
            <Text className="text-white font-bold text-sm mb-1">Gift cards</Text>
            <Text className="text-white/40 text-[10px]">Buy gift cards</Text>
          </GlassView>
        </View>

        {/* Promo Banner */}
        <PromoBanner 
          title="New welcome back offer"
          subtitle="Earn ₹21 when you welcome friends back to Google Pay"
          actionText="Invite & earn"
        />

        {/* Manage Your Money */}
        <SectionHeader title="Manage your money" />
        <View className="flex-row gap-4 mb-4">
            <GlassView className="flex-1 p-4 rounded-3xl bg-white/5 border-white/5">
                <ShieldCheck size={24} color="#9D174D" className="mb-3" />
                <Text className="text-white font-bold text-sm mb-1">Flex by Google Pay</Text>
                <Text className="text-white/40 text-[10px] mb-4">UPI credit card made simple</Text>
                <Text className="text-primary font-bold text-xs">Apply</Text>
            </GlassView>
            <GlassView className="flex-1 p-4 rounded-3xl bg-white/5 border-white/5">
                <Landmark size={24} color="#9D174D" className="mb-3" />
                <Text className="text-white font-bold text-sm mb-1">Personal loan</Text>
                <Text className="text-white/40 text-[10px] mb-4">Up to ₹10 lakh, instant approval</Text>
                <Text className="text-primary font-bold text-xs">Check details</Text>
            </GlassView>
        </View>

        <ManageMoneyItem 
          title="Check your CIBIL score for free"
          icon={<History size={24} color="#9D174D" />}
        />
        <ManageMoneyItem 
          title="See transaction history"
          icon={<History size={24} color="#9D174D" />}
        />
        <ManageMoneyItem 
          title="Check bank balance"
          icon={<Landmark size={24} color="#9D174D" />}
        />

        <View className="h-40" />
      </Animated.ScrollView>

      <GlassBottomSheet ref={bottomSheetRef}>
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl">✓</Text>
          </View>
          <Text className="text-2xl font-bold text-white">Payment Success</Text>
        </View>
        <TouchableOpacity className="bg-primary py-4 rounded-3xl w-full items-center">
          <Text className="text-white font-bold text-lg">Done</Text>
        </TouchableOpacity>
      </GlassBottomSheet>
    </View>
  );
};

export default HomeScreen;
