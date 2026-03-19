import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions, Alert, Clipboard } from 'react-native';
import { 
  ArrowLeft, 
  HelpCircle, 
  Download, 
  Share2, 
  Copy,
  Landmark,
  Check
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

const { width } = Dimensions.get('window');

const UPIDetailsScreen = ({ navigation }) => {
  const [bankAccounts, setBankAccounts] = useState([
    { id: '1', bankName: 'Indian Bank - 5076', upiId: '967739564@ybl', color: 'bg-orange-500', isPrimary: true },
    { id: '2', bankName: 'HDFC Bank - 1234', upiId: '967739564@hdfc', color: 'bg-blue-600', isPrimary: false },
    { id: '3', bankName: 'ICICI Bank - 5678', upiId: '967739564@icici', color: 'bg-[#FF6600]', isPrimary: false },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleSetPrimary = (id) => {
    setBankAccounts(prev => prev.map(acc => ({
      ...acc,
      isPrimary: acc.id === id
    })));
  };

  const onCopy = (text) => {
    Clipboard.setString(text);
    Alert.alert('Success', 'UPI ID copied to clipboard!');
  };

  const onShare = async () => {
    try {
      const activeAccount = bankAccounts[activeIndex];
      await Share.open({
        title: 'Share UPI Details',
        message: `Pay ${activeAccount.bankName} using UPI: ${activeAccount.upiId}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const onDownload = () => {
    Alert.alert('Success', 'QR code downloaded to gallery!');
  };

  const renderBankItem = ({ item }) => (
    <View style={{ width: width - 40 }} className="items-center">
      {/* Bank Logo & Name */}
      <View className="items-center mb-2">
          <View className={`w-16 h-16 rounded-full ${item.color} items-center justify-center mb-4 border-2 border-white/10`}>
              <Landmark size={32} color="#fff" />
          </View>
          <Text className="text-white text-xl font-bold">{item.bankName}</Text>
          
          {item.isPrimary ? (
            <Text className="text-emerald-500 text-sm mt-1 font-medium">Primary account for receiving money</Text>
          ) : (
            <TouchableOpacity onPress={() => handleSetPrimary(item.id)}>
                <Text className="text-primary text-sm mt-1 font-bold underline">Set as primary account</Text>
            </TouchableOpacity>
          )}
      </View>

      {/* Branded QR Code */}
      <View className="bg-white p-6 rounded-[40px] my-10 relative items-center justify-center">
          <QRCode
            value={item.upiId}
            size={240}
            color="#000"
            backgroundColor="transparent"
          />
          <View className="absolute bg-white p-2 rounded-full shadow-lg">
              <View className="px-3 py-1 bg-primary rounded-xl items-center justify-center">
                  <Text className="text-white font-black text-[10px] uppercase">MoneyPay</Text>
              </View>
          </View>
      </View>

      {/* UPI ID Section */}
      <View className="flex-row items-center mb-10 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
          <Text className="text-white/60 text-base mr-3">UPI ID: </Text>
          <Text className="text-white font-bold text-base mr-3">{item.upiId}</Text>
          <TouchableOpacity onPress={() => onCopy(item.upiId)}>
              <Copy size={20} color="#ffffff66" />
          </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0B0D0F]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <HelpCircle size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-10 px-5">
           <FlatList
             ref={flatListRef}
             data={bankAccounts}
             renderItem={renderBankItem}
             keyExtractor={item => item.id}
             horizontal
             pagingEnabled
             showsHorizontalScrollIndicator={false}
             snapToAlignment="center"
             onMomentumScrollEnd={(e) => {
               const index = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
               setActiveIndex(index);
             }}
           />

           {/* Pagination Dots */}
           <View className="flex-row justify-center mb-4">
               {bankAccounts.map((_, i) => (
                   <View 
                     key={i} 
                     className={`h-2 rounded-full mx-1 ${i === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-white/20'}`}
                   />
               ))}
           </View>
        </View>

        <View className="px-5">
            {/* Action Buttons */}
            <View className="flex-row gap-4 mb-12">
                <TouchableOpacity onPress={onDownload} className="flex-1 flex-row items-center justify-center bg-white/5 border border-white/10 py-4 rounded-2xl">
                    <Download size={20} color="#fff" className="mr-2" />
                    <Text className="text-white font-bold text-base">Download</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} className="flex-1 flex-row items-center justify-center bg-white/5 border border-white/10 py-4 rounded-2xl">
                    <Share2 size={20} color="#fff" className="mr-2" />
                    <Text className="text-white font-bold text-base">Share</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="w-full pt-10 border-t border-white/5 items-center">
                <Text className="text-white/30 text-xs mb-4">Supported on all UPI apps</Text>
                <View className="flex-row items-center justify-center space-x-6 opacity-30">
                    <Text className="text-white font-bold text-xs">PhonePe</Text>
                    <Text className="text-white font-bold text-xs">BHIM</Text>
                    <Text className="text-white font-bold text-xs">GPay</Text>
                    <Text className="text-white font-bold text-xs">Paytm</Text>
                </View>
                
                <View className="mt-8 items-center bg-white/5 px-4 py-2 rounded-xl">
                    <Text className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Powered by UPI</Text>
                </View>
            </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UPIDetailsScreen;
