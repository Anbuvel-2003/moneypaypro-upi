import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const ProfileListItem = ({ icon, title, subtitle, onPress, badgeText, badgeColor = 'bg-blue-500' }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-5 px-1 border-b border-white/5"
      activeOpacity={0.7}
    >
      <View className="w-8 h-8 items-center justify-center mr-5">
        {icon}
      </View>
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="text-white font-medium text-base mr-2">{title}</Text>
          {badgeText && (
            <View className={`px-2 py-0.5 rounded-full ${badgeColor}`}>
              <Text className="text-white text-[10px] font-bold">{badgeText}</Text>
            </View>
          )}
        </View>
        {subtitle && <Text className="text-white/50 text-xs mt-1">{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color="#ffffff33" />
    </TouchableOpacity>
  );
};

export default ProfileListItem;
