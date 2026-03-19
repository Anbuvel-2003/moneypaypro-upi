import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { 
  CreditCard, 
  QrCode, 
  RefreshCcw, 
  Heart, 
  Settings, 
  User, 
  HelpCircle, 
  Globe 
} from 'lucide-react-native';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileListItem from '../components/profile/ProfileListItem';
import AddBankOption from '../components/profile/AddBankOption';
import QRCodeModal from '../components/profile/QRCodeModal';
import GlassView from '../components/GlassView';

const ProfileScreen = () => {
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const user = {
        name: 'Dharani Surya',
        upiId: 'anbuvel2003@okaxis'
    };

    return (
        <View className="flex-1 bg-[#0B0D0F]">
            <ScrollView 
                className="flex-1"
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
                        icon={<CreditCard size={24} color="#60A5FA" />}
                        title="Pay with credit or debit cards"
                        subtitle="Contactless payments, bills, and more"
                        badgeText="Add"
                        badgeColor="bg-blue-600/20"
                        onPress={() => console.log('Card click')}
                    />
                    
                    <ProfileListItem 
                        icon={<QrCode size={24} color="#60A5FA" />}
                        title="Your QR code"
                        subtitle="Use to receive money from any UPI app"
                        onPress={() => setQrModalVisible(true)}
                    />

                    <ProfileListItem 
                        icon={<RefreshCcw size={24} color="#60A5FA" />}
                        title="Autopay"
                        subtitle="No pending requests"
                        onPress={() => console.log('Autopay click')}
                    />

                    <ProfileListItem 
                        icon={<Heart size={24} color="#60A5FA" />}
                        title="UPI Circle"
                        subtitle="Help people you trust make UPI payme..."
                        badgeText="New"
                        badgeColor="bg-blue-600/30"
                        onPress={() => console.log('Circle click')}
                    />

                    <ProfileListItem 
                        icon={<Settings size={22} color="#60A5FA" />}
                        title="Settings"
                        onPress={() => console.log('Settings click')}
                    />

                    <ProfileListItem 
                        icon={<User size={22} color="#60A5FA" />}
                        title="Manage Google account"
                        onPress={() => console.log('Account click')}
                    />

                    <ProfileListItem 
                        icon={<HelpCircle size={22} color="#60A5FA" />}
                        title="Get help"
                        onPress={() => console.log('Help click')}
                    />

                    <ProfileListItem 
                        icon={<Globe size={22} color="#60A5FA" />}
                        title="Language"
                        subtitle="English"
                        onPress={() => console.log('Language click')}
                    />
                </View>

                {/* Footer Version Info */}
                <View className="items-center py-4">
                    <Text className="text-white/20 text-xs">MoneyPay Pro v1.0.4</Text>
                </View>
            </ScrollView>

            {/* QR Code Modal */}
            <QRCodeModal 
                visible={qrModalVisible}
                onClose={() => setQrModalVisible(false)}
                upiId={user.upiId}
                userName={user.name}
            />
        </View>
    );
};

export default ProfileScreen;
