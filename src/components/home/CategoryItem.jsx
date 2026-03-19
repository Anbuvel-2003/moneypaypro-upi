import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import GlassView from '../GlassView';
import { useSettings } from '../../context/SettingsContext';

const CategoryItem = ({ label, icon, image, bgColor = 'bg-primary/20', isGlass = true }) => {
  const { colors } = useSettings();
  return (
    <TouchableOpacity className="items-center w-1/4 mb-6" activeOpacity={0.7}>
      <View className="relative">
        {isGlass ? (
          <GlassView 
            className={`w-14 h-14 rounded-full border border-white/5 items-center justify-center overflow-hidden mb-2 ${bgColor}`}
            blurAmount={10}
          >
            {image ? (
              <Image source={image} className="w-full h-full" resizeMode="cover" />
            ) : icon ? (
              <View className="items-center justify-center">
                {icon}
              </View>
            ) : (
              <Text className="text-white font-bold text-xl">
                {label?.charAt(0).toUpperCase()}
              </Text>
            )}
          </GlassView>
        ) : (
          <View className={`w-14 h-14 rounded-full items-center justify-center overflow-hidden mb-2 ${bgColor}`}>
            {image ? (
              <Image source={image} className="w-full h-full" resizeMode="cover" />
            ) : icon ? (
              <View className="items-center justify-center">
                {icon}
              </View>
            ) : (
              <Text className="text-white font-bold text-xl">
                {label?.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
        )}
      </View>
      <View className="h-8 justify-start">
        <Text 
          style={{ color: colors.textSecondary }}
          className="text-[10px] text-center px-0.5 font-medium leading-tight" 
          numberOfLines={2}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
