import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { 
  ArrowLeft, 
  HelpCircle, 
  Fingerprint, 
  Key, 
  UserX,
  ChevronRight
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';

const SecurityScreen = ({ navigation }) => {
  const { colors } = useSettings();
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const SettingItem = ({ icon: Icon, title, onPress, value, onToggle, hasChevron = true }) => (
    <TouchableOpacity 
      onPress={onPress}
      disabled={onToggle}
      className="flex-row items-center py-5 border-b border-white/5"
    >
      <View className="w-10 h-10 items-center justify-center">
        <Icon size={22} color={colors.text} />
      </View>
      <Text style={{ color: colors.text }} className="flex-1 text-base ml-2">{title}</Text>
      {onToggle ? (
        <Switch 
          value={value} 
          onValueChange={onToggle}
          trackColor={{ false: '#3e3e3e', true: '#22c55e' }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        hasChevron && <ChevronRight size={20} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <HelpCircle size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5">
        <Text style={{ color: colors.text }} className="text-2xl font-bold my-6">Security</Text>

        <SettingItem 
          icon={Fingerprint} 
          title="Biometric & screen lock" 
          value={biometricEnabled}
          onToggle={setBiometricEnabled}
        />
        <SettingItem 
          icon={Key} 
          title="Set Up passcode" 
          onPress={() => {}}
        />
        <SettingItem 
          icon={UserX} 
          title="Blocked accounts" 
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecurityScreen;
