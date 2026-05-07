import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useSettings } from '../context/SettingsContext';

const GlassView = ({ children, className = "", blurAmount = 20, blurType, style, ...props }) => {
  const { isDark } = useSettings();
  
  const effectiveBlurType = blurType || (isDark ? 'dark' : 'light');
  const defaultClassName = isDark ? 'border-white/20 bg-white/10' : 'border-black/10 bg-black/5';

  return (
    <View style={style} className={`overflow-hidden border ${defaultClassName} ${className}`} {...props}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={effectiveBlurType}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor={isDark ? "black" : "white"}
      />
      {children}
    </View>
  );
};

export default GlassView;
