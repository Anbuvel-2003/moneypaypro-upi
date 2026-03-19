import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import GlassView from '../GlassView';

const CategoryItem = ({ label, icon, image, bgColor = 'bg-primary/20' }) => {
  return (
    <TouchableOpacity className="items-center w-20 mb-6" activeOpacity={0.7}>
      <View className={`w-14 h-14 rounded-full items-center justify-center overflow-hidden mb-2 ${bgColor}`}>
        {image ? (
          <Image source={image} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="items-center justify-center">
            {icon}
          </View>
        )}
      </View>
      <Text 
        className="text-white/80 text-[10px] text-center px-1 font-medium" 
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
