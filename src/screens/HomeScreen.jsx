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
  Plus,
  Play
} from 'lucide-react-native';
import { useTabBarVisibility } from '../navigation/TabBarVisibilityContext';
import { useNavigation } from '@react-navigation/native';
import GlassView from '../components/GlassView';
import GlassBottomSheet from '../components/GlassBottomSheet';
import { useSettings } from '../context/SettingsContext';

// Home Components
import SectionHeader from '../components/home/SectionHeader';
import CategoryItem from '../components/home/CategoryItem';
import PromoBanner from '../components/home/PromoBanner';
import ManageMoneyItem from '../components/home/ManageMoneyItem';

const HomeScreen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const { hideTabBar, showTabBar } = useTabBarVisibility();
  const { colors, isDark } = useSettings();
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
    { label: 'Jio Prepaid', bgColor: 'bg-[#E30613]', isGlass: false },
    { label: 'Airtel Prepaid', bgColor: 'bg-[#E40000]', isGlass: false },
    { label: 'Vi Prepaid', bgColor: 'bg-[#FF0000]', isGlass: false },
    { label: 'Google Play', icon: <Play size={22} color="#4285F4" fill="#4285F4" />, bgColor: 'bg-white', isGlass: false },
    { label: 'Mobile recharge', icon: <Smartphone size={24} color={colors.primary} />, bgColor: isDark ? 'bg-primary/5' : 'bg-primary/10' },
    { label: 'DTH / Cable TV', icon: <Tv size={24} color={colors.primary} />, bgColor: isDark ? 'bg-primary/5' : 'bg-primary/10' },
    { label: 'Electricity', icon: <Lightbulb size={24} color={colors.primary} />, bgColor: isDark ? 'bg-primary/5' : 'bg-primary/10' },
    { label: 'FASTag recharge', icon: <Car size={24} color={colors.primary} />, bgColor: isDark ? 'bg-primary/5' : 'bg-primary/10' },
  ];

  const businessData = [
    { label: 'Sasikala L', bgColor: 'bg-orange-600/20' },
    { label: 'Aroma Bakes', bgColor: 'bg-blue-600/20' },
    { label: 'Kanaka Store', bgColor: 'bg-emerald-600/20' },
    { label: 'More', icon: <Plus size={24} color={colors.text} />, bgColor: isDark ? 'bg-slate-800' : 'bg-slate-200' },
  ];

  return (
    <View style={{ backgroundColor: colors.background }} className="flex-1">
      <Animated.ScrollView 
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 100 }}
      >
        {/* Header Section (Simulated) */}
        <View className="mb-8 items-center">
            <View className="w-full flex-row justify-between items-center mb-6">
                <View style={{ backgroundColor: isDark ? colors.surface : colors.surfaceSecondary }} className="w-10 h-10 rounded-full" />
                <View className="flex-row gap-4">
                    <History size={24} color={colors.text} />
                    <View style={{ backgroundColor: isDark ? colors.surface : colors.surfaceSecondary }} className="w-8 h-8 rounded-full" />
                </View>
            </View>
            <View style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.border }} className="w-full h-40 rounded-3xl border items-center justify-center">
                <Text style={{ color: colors.textSecondary }} className="mb-2">Scan any QR code</Text>
                <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center">
                    <Smartphone size={32} color="#fff" />
                </View>
            </View>
        </View>

        {/* Bills & Recharges */}
        <SectionHeader 
          title="Bills & recharges" 
          actionText="Manage" 
          onActionPress={() => navigation.navigate('RechargeBills')}
        />
        <View className="flex-row flex-wrap justify-start -mx-1 mb-4">
          {billsData.map((item, index) => (
            <CategoryItem 
              key={index} 
              label={item.label} 
              icon={item.icon}
              bgColor={item.bgColor}
              isGlass={item.isGlass !== undefined ? item.isGlass : true}
            />
          ))}
        </View>

        {/* Businesses */}
        <SectionHeader 
          title="Businesses" 
          actionText="Explore" 
          onActionPress={() => {}} 
        />
        <View className="flex-row flex-wrap justify-start -mx-1 mb-4">
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
          <GlassView style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.border }} className="flex-1 p-4 rounded-3xl">
            <View className="w-10 h-10 bg-primary/20 rounded-xl items-center justify-center mb-3">
              <Plus size={24} color={colors.primary} />
            </View>
            <Text style={{ color: colors.text }} className="font-bold text-sm mb-1">Subscriptions</Text>
            <Text style={{ color: colors.textSecondary }} className="text-[10px]">Buy plans from</Text>
          </GlassView>
          <GlassView style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.border }} className="flex-1 p-4 rounded-3xl">
            <View className="w-10 h-10 bg-primary/20 rounded-xl items-center justify-center mb-3">
              <CreditCard size={24} color={colors.primary} />
            </View>
            <Text style={{ color: colors.text }} className="font-bold text-sm mb-1">Gift cards</Text>
            <Text style={{ color: colors.textSecondary }} className="text-[10px]">Buy gift cards</Text>
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
            <GlassView style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.border }} className="flex-1 p-4 rounded-3xl">
                <ShieldCheck size={24} color={colors.primary} className="mb-3" />
                <Text style={{ color: colors.text }} className="font-bold text-sm mb-1">Flex by Google Pay</Text>
                <Text style={{ color: colors.textSecondary }} className="text-[10px] mb-4">UPI credit card made simple</Text>
                <Text style={{ color: colors.primary }} className="font-bold text-xs">Apply</Text>
            </GlassView>
            <GlassView style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.border }} className="flex-1 p-4 rounded-3xl">
                <Landmark size={24} color={colors.primary} className="mb-3" />
                <Text style={{ color: colors.text }} className="font-bold text-sm mb-1">Personal loan</Text>
                <Text style={{ color: colors.textSecondary }} className="text-[10px] mb-4">Up to ₹10 lakh, instant approval</Text>
                <Text style={{ color: colors.primary }} className="font-bold text-xs">Check details</Text>
            </GlassView>
        </View>

        <View className="mb-4">
          <ManageMoneyItem 
            title="Check your CIBIL score for free"
            icon={<History size={24} color={colors.primary} />}
          />
          <ManageMoneyItem 
            title="See transaction history"
            icon={<History size={24} color={colors.primary} />}
            onPress={() => navigation.navigate('History')}
          />
          <ManageMoneyItem 
            title="Check bank balance"
            icon={<Landmark size={24} color={colors.primary} />}
          />
        </View>

        <View className="h-40" />
      </Animated.ScrollView>

      <GlassBottomSheet ref={bottomSheetRef}>
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl">✓</Text>
          </View>
          <Text style={{ color: colors.text }} className="text-2xl font-bold">Payment Success</Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: colors.primary }} className="py-4 rounded-3xl w-full items-center">
          <Text className="text-white font-bold text-lg">Done</Text>
        </TouchableOpacity>
      </GlassBottomSheet>
    </View>
  );
};

export default HomeScreen;
