import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { QrCode, Share2 } from 'lucide-react-native';
import GlassView from '../GlassView';

const ProfileHeader = ({ userName, upiId, onOpenQR }) => {
  return (
    <View className="items-center mt-12 mb-8">
      <TouchableOpacity 
        onPress={onOpenQR}
        activeOpacity={0.9}
        className="items-center"
      >
        <View className="w-24 h-24 rounded-[32px] bg-slate-800 items-center justify-center mb-4 border-2 border-white/10 overflow-hidden">
          <View className="w-full h-full bg-blue-600 items-center justify-center">
             <Text className="text-white text-4xl font-bold">{userName?.charAt(0) || 'U'}</Text>
          </View>
        </View>
        
        <Text className="text-white text-2xl font-bold mb-1">{userName}</Text>
        <View className="flex-row items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <Text className="text-white/40 text-xs mr-2">{upiId}</Text>
          <QrCode size={14} color="#ffffff66" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
