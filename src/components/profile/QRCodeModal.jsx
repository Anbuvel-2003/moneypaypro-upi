import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import { X, Share2, Copy } from 'lucide-react-native';
import GlassView from '../GlassView';

const QRCodeModal = ({ visible, onClose, upiId, userName }) => {
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Share UPI ID',
        message: `Pay me on MoneyPay Pro using UPI ID: ${upiId}`,
        url: `upi://pay?pa=${upiId}&pn=${userName}`, // Basic UPI deep link
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <GlassView className="w-[85%] p-8 rounded-[40px] items-center bg-slate-900/90 border-white/10">
          <TouchableOpacity 
            onPress={onClose}
            className="absolute top-6 right-6 p-2 bg-white/5 rounded-full"
          >
            <X size={20} color="#fff" />
          </TouchableOpacity>

          <View className="mt-4 mb-8 items-center">
            <View className="w-20 h-20 rounded-3xl bg-blue-600 items-center justify-center mb-4">
                <Text className="text-white text-3xl font-bold">{userName?.charAt(0) || 'U'}</Text>
            </View>
            <Text className="text-white text-xl font-bold">{userName}</Text>
            <Text className="text-white/40 text-sm">{upiId}</Text>
          </View>

          <View className="p-6 bg-white rounded-3xl mb-8">
            <QRCode
              value={`upi://pay?pa=${upiId}&pn=${userName}`}
              size={180}
              color="black"
              backgroundColor="white"
            />
          </View>

          <View className="flex-row gap-4 w-full">
            <TouchableOpacity 
              onPress={handleShare}
              className="flex-1 flex-row items-center justify-center bg-blue-600 py-4 rounded-2xl"
            >
              <Share2 size={18} color="#fff" className="mr-2" />
              <Text className="text-white font-bold">Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 flex-row items-center justify-center bg-white/5 py-4 rounded-2xl border border-white/10"
            >
              <Copy size={18} color="#fff" className="mr-2" />
              <Text className="text-white font-bold">Copy</Text>
            </TouchableOpacity>
          </View>
        </GlassView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

export default QRCodeModal;
