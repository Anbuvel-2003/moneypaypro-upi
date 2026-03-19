import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { Zap, ZapOff, Image as ImageIcon, ArrowLeft, HelpCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  Easing
} from 'react-native-reanimated';
import { launchImageLibrary } from 'react-native-image-picker';
import GlassView from '../GlassView';

const { width, height } = Dimensions.get('window');

const ScannerView = ({ onCodeScanned, onClose }) => {
  const device = useCameraDevice('back');
  const [torch, setTorch] = useState('off');
  
  // Heartbeat Scale Animation
  const scale = useSharedValue(1);
  const scanLinePos = useSharedValue(0);
  const scanLineOpacity = useSharedValue(0.6);

  useEffect(() => {
    // Heartbeat Pulse Animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 400, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(1, { duration: 400, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );

    // Scan Line Heartbeat Pulse
    scanLinePos.value = withRepeat(
      withTiming(width * 0.7, { duration: 2500, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
    
    scanLineOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.4, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  const animatedFrameStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLinePos.value }],
    opacity: scanLineOpacity.value,
  }));

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        onCodeScanned(codes[0].value);
      }
    }
  });

  const handleGalleryUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    
    if (result.assets && result.assets.length > 0) {
      console.log('Image selected:', result.assets[0].uri);
      onCodeScanned('SCANNED_FROM_GALLERY');
    }
  };

  if (!device) return <View className="flex-1 bg-black items-center justify-center"><Text className="text-white">Camera not found</Text></View>;

  return (
    <View style={StyleSheet.absoluteFill} className="bg-black">
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
        torch={torch}
      />
      
      {/* Scanner Overlay UI */}
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={onClose} className="p-2">
            <ArrowLeft size={28} color="#fff" />
          </TouchableOpacity>
          <View className="flex-1 ml-4">
            <Text className="text-white font-bold text-xl">Scan any QR</Text>
            <Text className="text-white/60 text-xs">PhonePe • Google Pay • BHIM • Paytm</Text>
          </View>
          <TouchableOpacity className="p-2">
            <HelpCircle size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Scan Frame Area */}
        <View style={styles.frameContainer}>
          <Animated.View style={[styles.frame, animatedFrameStyle]}>
             {/* Corner borders */}
             <View style={[styles.corner, styles.topLeft]} />
             <View style={[styles.corner, styles.topRight]} />
             <View style={[styles.corner, styles.bottomLeft]} />
             <View style={[styles.corner, styles.bottomRight]} />
             
             {/* Scanning Line */}
             <Animated.View style={[styles.scanLine, animatedLineStyle]} />
          </Animated.View>
        </View>

        {/* Bottom Controls */}
        <View className="mb-12">
            <View className="flex-row justify-center gap-12 mb-10">
                <View className="items-center">
                    <TouchableOpacity 
                        onPress={handleGalleryUpload}
                        className="w-16 h-16 bg-white/10 rounded-full items-center justify-center border border-white/20 mb-2"
                    >
                        <ImageIcon size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text className="text-white text-xs">Upload QR</Text>
                </View>

                <View className="items-center">
                    <TouchableOpacity 
                        onPress={() => setTorch(t => t === 'on' ? 'off' : 'on')}
                        className={`w-16 h-16 rounded-full items-center justify-center border border-white/20 mb-2 ${torch === 'on' ? 'bg-white/30' : 'bg-white/10'}`}
                    >
                        <Zap size={28} color={torch === 'on' ? '#FACC15' : '#fff'} />
                    </TouchableOpacity>
                    <Text className="text-white text-xs">Torch</Text>
                </View>
            </View>
            
            <View className="items-center flex-row justify-center gap-2 opacity-60">
                <Text className="text-white/40 font-bold text-lg">BHIM</Text>
                <View className="w-[1px] h-4 bg-white/20" />
                <Text className="text-white/40 font-bold text-lg italic">UPI</Text>
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingTop: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  frameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: width * 0.75,
    height: width * 0.75,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  corner: {
    width: 30,
    height: 30,
    borderColor: '#9D174D', // Theme corner
    position: 'absolute',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 20,
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#9D174D',
    shadowColor: '#9D174D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  }
});

export default ScannerView;
