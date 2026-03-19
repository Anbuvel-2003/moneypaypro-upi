import React, { useCallback, useMemo, useRef, forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import GlassView from './GlassView';

const GlassBackground = ({ style }) => (
  <View style={[style, { backgroundColor: 'transparent' }]}>
    <GlassView className="absolute inset-0" blurAmount={50} />
  </View>
);

const GlassBottomSheet = forwardRef(({ children, snapPoints }, ref) => {
  const defaultSnapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints || defaultSnapPoints}
      enablePanDownToClose
      backgroundComponent={GlassBackground}
      handleIndicatorStyle={{ backgroundColor: '#fff', opacity: 0.3 }}
    >
      <BottomSheetView className="flex-1 p-6">
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});

export default GlassBottomSheet;
