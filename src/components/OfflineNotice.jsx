import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { useNetwork } from '../hooks/useNetwork';
import GlassView from './GlassView';

const OfflineNotice = () => {
  const isConnected = useNetwork();
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isConnected ? -100 : 60,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <GlassView className="flex-row items-center px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20">
        <WifiOff size={18} color="#EF4444" className="mr-3" />
        <Text className="text-white font-bold text-sm">You are offline</Text>
      </GlassView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
  },
});

export default OfflineNotice;
