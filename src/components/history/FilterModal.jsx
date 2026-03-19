import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  SafeAreaView
} from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';

const FilterModal = ({ visible, onClose, onApply, initialFilters }) => {
  const [activeCategory, setActiveCategory] = useState('Months');
  const [selectedFilters, setSelectedFilters] = useState(initialFilters || {
    Months: ['Feb 2026', 'Jan 2026'],
    Categories: ['Money received'],
    Instruments: ['UPI/Bank account'],
    'Payment status': []
  });

  const categories = [
    { name: 'Months', count: selectedFilters.Months.length },
    { name: 'Categories', count: selectedFilters.Categories.length },
    { name: 'Instruments', count: selectedFilters.Instruments.length },
    { name: 'Payment status', count: selectedFilters['Payment status'].length },
  ];

  const options = {
    Months: ['Feb 2026', 'Jan 2026', 'Dec 2025', 'Nov 2025', 'Oct 2025', 'Sept 2025', 'Aug 2025', 'Jul 2025', 'Jun 2025', 'May 2025'],
    Categories: ['Money sent', 'Money received', 'Merchant payments'],
    Instruments: ['UPI/Bank account', 'Wallet', 'Credit Card'],
    'Payment status': ['Failed', 'Successful']
  };

  const toggleFilter = (category, option) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      const next = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      return { ...prev, [category]: next };
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({
      Months: [],
      Categories: [],
      Instruments: [],
      'Payment status': []
    });
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
        <View className="flex-row justify-between items-center px-4 py-4 border-b border-white/5">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={onClose} className="mr-4">
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Filters</Text>
          </View>
          <TouchableOpacity onPress={handleClearAll}>
            <Text className="text-primary font-medium">Clear all</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* Left Pane - Categories */}
          <View style={{ width: '33%', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.05)' }}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                onPress={() => setActiveCategory(cat.name)}
                style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  paddingHorizontal: 16, 
                  paddingVertical: 24,
                  backgroundColor: activeCategory === cat.name ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderLeftWidth: activeCategory === cat.name ? 4 : 0,
                  borderLeftColor: '#9D174D'
                }}
              >
                <Text style={{ fontSize: 13, color: activeCategory === cat.name ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: activeCategory === cat.name ? 'bold' : 'normal' }}>
                  {cat.name}
                </Text>
                {cat.count > 0 && (
                  <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 'bold' }}>{cat.count}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Right Pane - Options */}
          <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
             {options[activeCategory].map((option) => (
               <TouchableOpacity 
                 key={option}
                 onPress={() => toggleFilter(activeCategory, option)}
                 style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}
               >
                 <Text style={{ fontSize: 16, color: selectedFilters[activeCategory].includes(option) ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: selectedFilters[activeCategory].includes(option) ? '500' : 'normal' }}>
                   {option}
                 </Text>
                 <View style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: 4, 
                    borderWidth: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: selectedFilters[activeCategory].includes(option) ? '#86EFAC' : 'transparent',
                    borderColor: selectedFilters[activeCategory].includes(option) ? '#86EFAC' : 'rgba(255,255,255,0.2)'
                 }}>
                    {selectedFilters[activeCategory].includes(option) && (
                      <Check size={16} color="#000" strokeWidth={3} />
                    )}
                 </View>
               </TouchableOpacity>
             ))}
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' }}>
           <TouchableOpacity 
             onPress={() => onApply(selectedFilters)}
             style={{ backgroundColor: '#9D174D', paddingVertical: 16, borderRadius: 12, alignItems: 'center' }}
           >
             <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Apply</Text>
           </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterModal;
