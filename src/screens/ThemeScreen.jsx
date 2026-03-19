import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { 
  ArrowLeft, 
  HelpCircle,
  CheckCircle2,
  Circle
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';

const ThemeScreen = ({ navigation }) => {
  const { themeMode, setThemeMode, colors } = useSettings();

  const ThemeOption = ({ id, title, subtext, isLast }) => (
    <TouchableOpacity 
      onPress={() => setThemeMode(id)}
      className={`flex-row items-center py-5 ${!isLast ? 'border-b border-white/5' : ''}`}
    >
      <View className="flex-1">
        <Text style={{ color: colors.text }} className="text-base font-medium">{title}</Text>
        {subtext && <Text style={{ color: colors.textSecondary }} className="text-xs mt-1">{subtext}</Text>}
      </View>
      {themeMode === id ? (
        <View className="w-6 h-6 items-center justify-center">
          <CheckCircle2 size={24} color="#22c55e" fill="#22c55e22" />
        </View>
      ) : (
        <Circle size={24} color={colors.textMuted} />
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
        <Text style={{ color: colors.text }} className="text-lg font-bold">Theme</Text>
        <TouchableOpacity className="p-2">
          <HelpCircle size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-5 pt-8">
        <View style={{ backgroundColor: colors.surfaceSecondary, borderColor: colors.border }} className="rounded-3xl p-2 border overflow-hidden">
             <ThemeOption id="light" title="Light" />
             <ThemeOption id="dark" title="Dark" />
             <ThemeOption 
               id="system" 
               title="System Default" 
               subtext="App uses the theme set on your phone"
               isLast={true}
             />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ThemeScreen;
