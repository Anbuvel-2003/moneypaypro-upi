import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import GlassView from '../GlassView';

const PromoBanner = ({ title, subtitle, actionText, onActionPress, image }) => {
  return (
    <GlassView className="p-5 mb-8 rounded-3xl overflow-hidden border-white/5 bg-primary/10">
      <View className="flex-row">
        <View className="flex-1">
          <Text className="text-xl text-white font-bold mb-2">{title}</Text>
          <Text className="text-white/60 mb-6 leading-5 text-sm">{subtitle}</Text>
          <TouchableOpacity 
            onPress={onActionPress}
            className="self-start px-4 py-2 bg-primary rounded-full"
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
