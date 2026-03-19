import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import GlassView from '../GlassView';
import { useSettings } from '../../context/SettingsContext';

const PromoBanner = ({ title, subtitle, actionText, onActionPress, image }) => {
  const { colors } = useSettings();
  return (
    <GlassView style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.border }} className="p-5 mb-8 rounded-3xl overflow-hidden border">
      <View className="flex-row">
        <View className="flex-1">
          <Text style={{ color: colors.text }} className="text-xl font-bold mb-2">{title}</Text>
          <Text style={{ color: colors.textSecondary }} className="mb-6 leading-5 text-sm">{subtitle}</Text>
          <TouchableOpacity 
            onPress={onActionPress}
            style={{ backgroundColor: colors.primary }}
            className="self-start px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold text-xs">{actionText}</Text>
          </TouchableOpacity>
        </View>
        <View className="w-24 h-24 items-center justify-center">
          {image && <Image source={image} className="w-full h-full" resizeMode="contain" />}
        </View>
      </View>
    </GlassView>
  );
};

export default PromoBanner;
