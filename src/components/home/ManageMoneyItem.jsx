import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import GlassView from '../GlassView';
import { useSettings } from '../../context/SettingsContext';

const ManageMoneyItem = ({ title, subtitle, icon, onPress }) => {
  const { colors } = useSettings();
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-4"
      activeOpacity={0.7}
    >
      <GlassView style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.border }} className="w-12 h-12 rounded-full border items-center justify-center mr-4">
        {icon}
      </GlassView>
      <View className="flex-1">
        <Text style={{ color: colors.text }} className="font-medium text-base">{title}</Text>
        {subtitle && <Text style={{ color: colors.textSecondary }} className="text-xs mt-0.5">{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
};

export default ManageMoneyItem;
