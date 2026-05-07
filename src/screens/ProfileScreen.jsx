import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Switch, Image } from 'react-native';
import { 
  ArrowLeft, 
  HelpCircle, 
  ChevronRight, 
  Smartphone, 
  Settings2, 
  Lock, 
  Gift, 
  Info, 
  LogOut, 
  QrCode,
  CreditCard,
  Landmark,
  Share2
} from 'lucide-react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useTabBarVisibility } from '../navigation/TabBarVisibilityContext';
import GlassView from '../components/GlassView';
import { useSettings } from '../context/SettingsContext';
import LanguageModal from '../components/profile/LanguageModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = ({ navigation }) => {
    const { hideTabBar, showTabBar } = useTabBarVisibility();
    const { t, language: currentLanguage, colors, isDark, shakeToScan, setShakeToScan } = useSettings();
    const lastScrollY = useSharedValue(0);

    const [languageModalVisible, setLanguageModalVisible] = useState(false);

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

    const user = {
        name: 'Dharani Surya',
        phone: '+91 9677395645',
        upiId: 'anbuvel2003@okaxis'
    };

    const SettingItem = ({ icon, title, subtitle, rightElement, onPress, isLast, color }) => (
        <TouchableOpacity 
            onPress={onPress}
            className={`flex-row items-center py-5 ${!isLast ? 'border-b border-white/5' : ''}`}
            style={{ borderBottomColor: colors.border }}
            activeOpacity={0.7}
        >
            <View className="w-10 h-10 items-center justify-center mr-4">
                {icon}
            </View>
            <View className="flex-1">
                <Text style={{ color: color || colors.text }} className="text-base font-medium">{title}</Text>
                {subtitle && <Text style={{ color: colors.textSecondary }} className="text-xs mt-0.5">{subtitle}</Text>}
            </View>
            {rightElement || <ChevronRight size={20} color={colors.textMuted} />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
            {/* Header */}
            <View style={{ borderBottomColor: colors.border }} className="flex-row justify-between items-center px-4 py-2 border-b">
                <TouchableOpacity onPress={() => navigation?.goBack()} className="p-2">
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                    <HelpCircle size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            <Animated.ScrollView 
                className="flex-1"
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* User Profile Section */}
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center">
                        <GlassView className="w-14 h-14 rounded-2xl bg-primary items-center justify-center mr-4 overflow-hidden border border-white/10">
                            <Text className="text-white text-2xl font-bold">{user.name.charAt(0)}</Text>
                        </GlassView>
                        <View>
                            <Text style={{ color: colors.text }} className="text-lg font-bold">{user.phone}</Text>
                            <Text style={{ color: colors.textSecondary }} className="text-xs">Update profile details</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={{ color: colors.primary }} className="font-bold">Manage</Text>
                    </TouchableOpacity>
                </View>

                {/* Status Badge */}
                <View className="flex-row mb-8">
                    <View className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex-row items-center">
                        <View className="w-4 h-4 rounded-full bg-emerald-500 items-center justify-center mr-2">
                          <Text className="text-[10px] text-white">✓</Text>
                        </View>
                        <Text className="text-emerald-500 text-[10px] font-bold">Receiving money on MoneyPay</Text>
                    </View>
                </View>

                {/* QR Code Card */}
                <GlassView 
                    style={{ borderColor: colors.border }} 
                    className={`p-6 rounded-[40px] border mb-8 items-center shadow-2xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}
                >
                    <View className="flex-row items-center mb-6 self-start">
                        <View className="w-8 h-8 rounded-full bg-orange-500 items-center justify-center mr-3">
                            <Landmark size={18} color="#fff" />
                        </View>
                        <Text style={{ color: colors.textSecondary }} className="font-medium">Indian Ban... - 5076</Text>
                    </View>
                    
                    <View className="bg-white p-4 rounded-3xl mb-6">
                        <QrCode size={180} color="#000" />
                    </View>
126: 
                    <TouchableOpacity onPress={() => navigation.navigate('UPIDetails')}>
                        <Text style={{ color: colors.primary }} className="font-bold">View UPI details</Text>
                    </TouchableOpacity>
                </GlassView>

                {/* Manage Payments Banner */}
                <TouchableOpacity activeOpacity={0.9} className="mb-10">
                    <GlassView style={{ backgroundColor: isDark ? 'rgba(30, 58, 138, 0.4)' : 'rgba(30, 58, 138, 0.1)', borderColor: 'rgba(96, 165, 250, 0.1)' }} className="flex-row items-center p-5 rounded-3xl border">
                        <View className="w-12 h-12 bg-blue-500/20 rounded-2xl items-center justify-center mr-4">
                            <CreditCard size={28} color="#60A5FA" />
                        </View>
                        <View className="flex-1">
                            <Text style={{ color: colors.text }} className="font-bold text-lg">Manage Payments</Text>
                            <Text style={{ color: colors.textSecondary }} className="text-xs mt-0.5">Bank, cards, wallet & more</Text>
                        </View>
                        <ChevronRight size={24} color="#60A5FA" />
                    </GlassView>
                </TouchableOpacity>

                {/* Settings List */}
                <View className="mb-4">
                    <SettingItem 
                        icon={<Smartphone size={24} color={colors.text} />}
                        title="Shake to Scan"
                        rightElement={
                            <Switch 
                                value={shakeToScan}
                                onValueChange={setShakeToScan}
                                trackColor={{ false: isDark ? '#334155' : '#CBD5E1', true: '#22c55e' }}
                                thumbColor="#fff"
                            />
                        }
                    />
                    <SettingItem 
                        icon={<Settings2 size={24} color={colors.text} />}
                        title="Preferences"
                        subtitle="Languages, permissions, reminders"
                        onPress={() => navigation.navigate('Preferences')}
                    />
                    <SettingItem 
                        icon={<Lock size={24} color={colors.text} />}
                        title="Security"
                        subtitle="Screen lock, passcode, blocked contacts"
                        onPress={() => navigation.navigate('Security')}
                    />
                    
                    <View style={{ backgroundColor: colors.border }} className="h-px my-4" />

                    <SettingItem 
                        icon={<Gift size={24} color={colors.text} />}
                        title="Refer and earn ₹200"
                    />
                    <SettingItem 
                        icon={<HelpCircle size={24} color={colors.text} />}
                        title="Help and support"
                    />
                    <SettingItem 
                        icon={<Info size={24} color={colors.text} />}
                        title="About MoneyPay"
                    />
                    
                    <View style={{ backgroundColor: colors.border }} className="h-px my-4" />

                    <SettingItem 
                        icon={<LogOut size={24} color="#ef4444" />}
                        title="Log out"
                        color="#ef4444"
                        isLast={true}
                    />
                </View>

                {/* Footer Version */}
                <View className="items-center py-8">
                    <Text style={{ color: colors.textMuted }} className="text-xs">v1.0.4</Text>
                </View>
            </Animated.ScrollView>

            {/* Language Modal */}
            <LanguageModal 
                visible={languageModalVisible}
                onClose={() => setLanguageModalVisible(false)}
            />
        </SafeAreaView>
    );
};

export default ProfileScreen;
