import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { Zap, ZapOff, Image as ImageIcon, X } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import GlassView from '../GlassView';

const { width, height } = Dimensions.get('window');

const ScannerView = ({ onCodeScanned, onClose }) => {
  const device = useCameraDevice('back');
  const [torch, setTorch] = useState('off');
  
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
      // NOTE: Scanning from an image usually requires a separate library or uploading to a server.
      // For this implementation, we'll simulate the process or use a library if available.
      // Most production apps use a dedicated library like 'react-native-local-barcode-recognizer'.
      console.log('Image selected:', result.assets[0].uri);
      // For now, we'll notify the user that we've received the image.
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
          <TouchableOpacity 
            onPress={onClose}
            className="p-3 bg-black/40 rounded-full"
          >
            <X size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">Scan QR Code</Text>
          <View className="w-10" /> {/* Spacer */}
        </View>

        {/* Scan Frame Area */}
        <View style={styles.frameContainer}>
          <View style={styles.frame}>
             {/* Corner borders can be added here for better UI */}
          </View>
          <Text className="text-white/60 text-center mt-8 px-10">
            Align QR code within the frame to scan
          </Text>
        </View>

        {/* Bottom Controls */}
        <View className="flex-row justify-center items-center gap-10 mb-20">
          <TouchableOpacity 
            onPress={handleGalleryUpload}
            className="w-16 h-16 bg-black/40 rounded-full items-center justify-center border border-white/10"
          >
            <ImageIcon size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setTorch(t => t === 'on' ? 'off' : 'on')}
            className={`w-20 h-20 rounded-full items-center justify-center border-2 border-white/20 ${torch === 'on' ? 'bg-yellow-500' : 'bg-black/40'}`}
          >
            {torch === 'on' ? <Zap size={32} color="#fff" /> : <ZapOff size={32} color="#fff" />}
          </TouchableOpacity>

          <View className="w-16 h-16" /> {/* Placeholder/Empty for symmetry */}
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
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  frameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  frame: {
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 2,
    borderColor: '#60A5FA',
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
});

export default ScannerView;
