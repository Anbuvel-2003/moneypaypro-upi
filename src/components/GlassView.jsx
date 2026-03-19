import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const GlassView = ({ children, className = "", blurAmount = 20, blurType = "dark" }) => {
  return (
    <View className={`overflow-hidden border border-white/20 bg-white/10 ${className}`}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={blurType}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor="white"
      />
      {children}
    </View>
  );
};

export default GlassView;
