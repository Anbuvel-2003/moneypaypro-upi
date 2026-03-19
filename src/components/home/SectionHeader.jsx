import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useSettings } from '../../context/SettingsContext';

const SectionHeader = ({ title, actionText, onActionPress }) => {
  const { colors } = useSettings();
  return (
    <View className="flex-row items-center justify-between mb-4">
      <Text style={{ color: colors.text }} className="text-xl font-medium">{title}</Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress} className="flex-row items-center">
          <Text style={{ color: colors.primary }} className="font-medium mr-1">{actionText}</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
