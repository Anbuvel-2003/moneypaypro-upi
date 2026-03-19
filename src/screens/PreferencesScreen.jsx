import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { 
  ArrowLeft, 
  HelpCircle, 
  Languages, 
  FileText, 
  Sliders, 
  Bell,
  Contrast,
  ChevronRight
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import LanguageModal from '../components/profile/LanguageModal';

const PreferencesScreen = ({ navigation }) => {
  const { colors, language, themeMode } = useSettings();

  const SettingItem = ({ icon: Icon, title, rightText, onPress }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-5 border-b border-white/5"
    >
      <View className="w-10 h-10 items-center justify-center">
        <Icon size={22} color={colors.text} />
      </View>
      <Text style={{ color: colors.text }} className="flex-1 text-base ml-2">{title}</Text>
      {rightText && (
        <Text style={{ color: colors.textSecondary }} className="text-sm mr-2">{rightText}</Text>
      )}
      <ChevronRight size={20} color={colors.textMuted} />
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
        <Text style={{ color: colors.text }} className="text-2xl font-bold my-6">Preferences</Text>

        <SettingItem 
          icon={Languages} 
          title="Languages" 
          rightText={language}
          onPress={() => navigation.navigate('Language')}
        />
        <SettingItem 
          icon={FileText} 
          title="Bill notifications" 
          onPress={() => {}}
        />
        <SettingItem 
          icon={Sliders} 
          title="Permissions" 
          onPress={() => {}}
        />
        <SettingItem 
          icon={Bell} 
          title="Reminders" 
          onPress={() => {}}
        />
        <SettingItem 
          icon={Contrast} 
          title="Theme" 
          rightText={themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
          onPress={() => navigation.navigate('Theme')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreferencesScreen;
