import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const SectionHeader = ({ title, actionText, onActionPress }) => {
  return (
    <View className="flex-row items-center justify-between mb-4 px-1">
      <Text className="text-xl text-white font-medium">{title}</Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress} className="flex-row items-center">
          <Text className="text-blue-400 font-medium mr-1">{actionText}</Text>
          <ChevronRight size={16} color="#60A5FA" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
