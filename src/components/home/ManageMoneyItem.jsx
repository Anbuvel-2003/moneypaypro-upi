import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const ManageMoneyItem = ({ title, subtitle, icon, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-white/5"
      activeOpacity={0.7}
    >
      <View className="w-10 h-10 items-center justify-center mr-4">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-white font-medium text-base">{title}</Text>
        {subtitle && <Text className="text-white/40 text-xs mt-0.5">{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color="#ffffff66" />
    </TouchableOpacity>
  );
};

export default ManageMoneyItem;
