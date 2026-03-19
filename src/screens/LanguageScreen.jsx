import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useSettings } from '../context/SettingsContext';

const LanguageScreen = ({ navigation }) => {
  const { language, setLanguage, t, colors } = useSettings();

  const languages = [
    { name: 'English', label: 'English' },
    { name: 'Tamil', label: 'தமிழ் (Tamil)' },
    { name: 'Telugu', label: 'తెలుగు (Telugu)' },
    { name: 'Malayalam', label: 'മലയാളം (Malayalam)' },
  ];

  const handleSelect = (lang) => {
    setLanguage(lang);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16, 
        paddingVertical: 16, 
        borderBottomWidth: 1, 
        borderBottomColor: colors.border 
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>{t('language')}</Text>
      </View>

      {/* Language List */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {languages.map((lang) => (
          <TouchableOpacity 
            key={lang.name}
            onPress={() => handleSelect(lang.name)}
            style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              paddingVertical: 20,
              borderBottomWidth: 1,
              borderBottomColor: colors.border
            }}
          >
            <Text style={{ 
              fontSize: 16, 
              color: language === lang.name ? colors.text : colors.textSecondary, 
              fontWeight: language === lang.name ? 'bold' : 'normal' 
            }}>
              {lang.label}
            </Text>
            {language === lang.name && (
              <View style={{ 
                width: 24, 
                height: 24, 
                borderRadius: 12, 
                backgroundColor: colors.primary, 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Check size={16} color="#fff" strokeWidth={3} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguageScreen;
