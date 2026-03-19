import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { 
  CreditCard, 
  QrCode, 
  RefreshCcw, 
  Settings, 
  User, 
  HelpCircle, 
  Globe,
  Heart
} from 'lucide-react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useTabBarVisibility } from '../navigation/TabBarVisibilityContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileListItem from '../components/profile/ProfileListItem';
import AddBankOption from '../components/profile/AddBankOption';
import QRCodeModal from '../components/profile/QRCodeModal';
import { useLanguage } from '../context/LanguageContext';
import LanguageModal from '../components/profile/LanguageModal';

const ProfileScreen = () => {
    const { hideTabBar, showTabBar } = useTabBarVisibility();
    const { t, language: currentLanguage } = useLanguage();
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

    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    
    const user = {
        name: 'Dharani Surya',
        upiId: 'anbuvel2003@okaxis'
    };

    return (
        <View className="flex-1 bg-[#0B0D0F]">
            <Animated.ScrollView 
                className="flex-1"
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={{ padding: 20, paddingTop: 40, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Header */}
                <ProfileHeader 
                    userName={user.name}
                    upiId={user.upiId}
                    onOpenQR={() => setQrModalVisible(true)}
                />

                {/* Add Bank Option */}
                <AddBankOption onPress={() => console.log('Add Bank')} />

                {/* List Items */}
                <View className="mb-8">
                    <ProfileListItem 
                        icon={<CreditCard size={24} color="#9D174D" />}
                        title={t('payWithCard')}
                        subtitle={t('contactless')}
                        badgeText="Add"
                        badgeColor="bg-primary/20"
                        onPress={() => console.log('Card click')}
                    />
                    
                    <ProfileListItem 
                        icon={<QrCode size={24} color="#9D174D" />}
                        title={t('yourQRCode')}
                        subtitle={t('receiveMoney')}
                        onPress={() => setQrModalVisible(true)}
                    />

                    <ProfileListItem 
                        icon={<RefreshCcw size={24} color="#9D174D" />}
                        title={t('autopay')}
                        subtitle={t('noPending')}
                        onPress={() => console.log('Autopay click')}
                    />

                    <ProfileListItem 
                        icon={<Heart size={24} color="#9D174D" />}
                        title={t('upiCircle')}
                        subtitle={t('helpPeople')}
                        badgeText="New"
                        badgeColor="bg-primary/30"
                        onPress={() => console.log('Circle click')}
                    />

                    <ProfileListItem 
                        icon={<Settings size={22} color="#9D174D" />}
                        title={t('settings')}
                        onPress={() => console.log('Settings click')}
                    />

                    <ProfileListItem 
                        icon={<User size={22} color="#9D174D" />}
                        title={t('manageAccount')}
                        onPress={() => console.log('Account click')}
                    />

                    <ProfileListItem 
                        icon={<HelpCircle size={22} color="#9D174D" />}
                        title={t('getHelp')}
                        onPress={() => console.log('Help click')}
                    />

                    <ProfileListItem 
                        icon={<Globe size={22} color="#9D174D" />}
                        title={t('language')}
                        subtitle={currentLanguage}
                        onPress={() => setLanguageModalVisible(true)}
                    />
                </View>

                {/* Footer Version Info */}
                <View className="items-center py-4">
                    <Text className="text-white/20 text-xs">MoneyPay Pro v1.0.4</Text>
                </View>
            </Animated.ScrollView>

            {/* QR Code Modal */}
            <QRCodeModal 
                visible={qrModalVisible}
                onClose={() => setQrModalVisible(false)}
                upiId={user.upiId}
                userName={user.name}
            />

            {/* Language Selection Modal */}
            <LanguageModal 
                visible={languageModalVisible}
                onClose={() => setLanguageModalVisible(false)}
            />
        </View>
    );
};

export default ProfileScreen;
