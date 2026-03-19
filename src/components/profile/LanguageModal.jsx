import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';

const LanguageModal = ({ visible, onClose }) => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { name: 'English', label: 'English' },
    { name: 'Tamil', label: 'தமிழ் (Tamil)' },
    { name: 'Telugu', label: 'తెలుగు (Telugu)' },
    { name: 'Malayalam', label: 'മലയാളം (Malayalam)' },
  ];

  const handleSelect = (lang) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent={false} 
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0D0F' }}>
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingHorizontal: 16, 
          paddingVertical: 16, 
          borderBottomWidth: 1, 
          borderBottomColor: 'rgba(255,255,255,0.05)' 
        }}>
          <TouchableOpacity onPress={onClose} style={{ marginRight: 16 }}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{t('language')}</Text>
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
                borderBottomColor: 'rgba(255,255,255,0.03)'
              }}
            >
              <Text style={{ 
                fontSize: 16, 
                color: language === lang.name ? '#fff' : 'rgba(255,255,255,0.6)', 
                fontWeight: language === lang.name ? 'bold' : 'normal' 
              }}>
                {lang.label}
              </Text>
              {language === lang.name && (
                <View style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 12, 
                  backgroundColor: '#9D174D', 
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
    </Modal>
  );
};

export default LanguageModal;
