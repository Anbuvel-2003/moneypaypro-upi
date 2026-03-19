import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { 
  Download, 
  Search, 
  SlidersHorizontal, 
  ArrowUpRight, 
  HelpCircle
} from 'lucide-react-native';
import { useTabBarVisibility } from '../navigation/TabBarVisibilityContext';
import GlassView from '../components/GlassView';
import FilterModal from '../components/history/FilterModal';

const HistoryScreen = () => {
  const { hideTabBar, showTabBar } = useTabBarVisibility();
  const lastScrollY = useSharedValue(0);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    Months: ['Feb 2026', 'Jan 2026'],
    Categories: ['Money received'],
    Instruments: ['UPI/Bank account'],
    'Payment status': []
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
        hideTabBar();
      } else if (currentScrollY < lastScrollY.value) {
        showTabBar();
      }
      lastScrollY.value = currentScrollY;
    },
  });

  const transactions = {
    FEBRUARY: [
      { id: 1, type: 'credit', title: 'Received from Appa 🌍❤️✨', amount: '+ ₹200', date: '14 Feb', bankIcon: '🏛️', avatar: 'https://ui-avatars.com/api/?name=Appa&background=random' },
      { id: 2, type: 'credit', title: 'Received from Appa 🌍❤️✨', amount: '+ ₹200', date: '13 Feb', bankIcon: '🏛️', avatar: 'https://ui-avatars.com/api/?name=Appa&background=random' },
    ],
    JANUARY: [
      { id: 3, type: 'debit', title: 'Paid to airtel', amount: '₹588.82', date: '19 Jan', bankIcon: '🏛️' },
    ]
  };

  // Filter Transactions Logic
  const filteredTransactions = {};
  Object.keys(transactions).forEach(monthKey => {
    const monthName = monthKey === 'FEBRUARY' ? 'Feb 2026' : monthKey === 'JANUARY' ? 'Jan 2026' : monthKey;
    
    // Check if month is selected
    if (appliedFilters.Months.length > 0 && !appliedFilters.Months.includes(monthName)) {
      return;
    }

    const items = transactions[monthKey].filter(item => {
      // Category filter
      if (appliedFilters.Categories.length > 0) {
        const catMap = { credit: 'Money received', debit: 'Money sent' };
        if (!appliedFilters.Categories.includes(catMap[item.type])) return false;
      }
      // Simplified Status filter for demo
      if (appliedFilters['Payment status'].length > 0) {
        if (!appliedFilters['Payment status'].includes('Successful')) return false; 
      }
      return true;
    });

    if (items.length > 0) {
      filteredTransactions[monthKey] = items;
    }
  });

  const TransactionItem = ({ item }) => (
    <TouchableOpacity className="flex-row items-center py-4 border-b border-white/5 mx-1" activeOpacity={0.7}>
      <View className="mr-4">
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full" />
        ) : (
          <View className="w-12 h-12 rounded-2xl bg-white/5 items-center justify-center border border-white/10">
            <ArrowUpRight size={24} color="#fff" />
          </View>
        )}
      </View>
      <View className="flex-1">
        <Text className="text-white/40 text-[10px] mb-1">
          {item.type === 'credit' ? 'Received from' : 'Paid to'}
        </Text>
        <Text className="text-white font-medium text-lg leading-tight">{item.title}</Text>
        <Text className="text-white/40 text-xs mt-1">{item.date}</Text>
      </View>
      <View className="items-end">
        <Text className={`font-bold text-lg ${item.type === 'credit' ? 'text-green-400' : 'text-white'}`}>
          {item.amount}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-white/40 text-[10px] mr-1">
             {item.type === 'credit' ? 'Credited to' : 'Debited from'}
          </Text>
          <View className="w-4 h-4 rounded-full bg-orange-400/80 items-center justify-center">
             <Text className="text-[6px] text-white font-bold">🏛️</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#0B0D0F]">
      <Animated.ScrollView 
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16, paddingTop: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6 px-1">
          <Text className="text-white text-3xl font-bold">History</Text>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity className="flex-row items-center bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Download size={18} color="#fff" className="mr-2" />
              <Text className="text-white font-medium text-sm">My Statements</Text>
            </TouchableOpacity>
            <HelpCircle size={24} color="#fff" />
          </View>
        </View>

        {/* Search Bar */}
        <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginHorizontal: 4, 
            paddingHorizontal: 16, 
            height: 56, 
            borderRadius: 18, 
            backgroundColor: 'rgba(255,255,255,0.06)', 
            borderWidth: 1, 
            borderColor: 'rgba(255,255,255,0.05)',
            marginBottom: 32
        }}>
            <Search size={22} color="rgba(255,255,255,0.5)" style={{ marginRight: 12 }} />
            <TextInput 
                placeholder="Search" 
                placeholderTextColor="rgba(255,255,255,0.4)"
                style={{ 
                    flex: 1, 
                    color: '#fff', 
                    fontSize: 16, 
                    fontWeight: '500',
                    height: '100%'
                }}
            />
            <View style={{ width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.1)', mx: 12, marginHorizontal: 12 }} />
            <TouchableOpacity 
                onPress={() => setFilterModalVisible(true)}
                style={{ padding: 4 }}
            >
                <SlidersHorizontal size={22} color="#fff" />
            </TouchableOpacity>
        </View>

        {/* Monthly Sections */}
        {Object.keys(filteredTransactions).map((monthKey) => (
          <View key={monthKey} className="mb-6">
            <Text className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-4 ml-1">
                {monthKey}
            </Text>
            {filteredTransactions[monthKey].map((item) => (
              <TransactionItem key={item.id} item={item} />
            ))}
          </View>
        ))}

        <View className="h-40" />
      </Animated.ScrollView>

      {/* Filter Modal */}
      <FilterModal 
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        initialFilters={appliedFilters}
        onApply={(newFilters) => {
          setAppliedFilters(newFilters);
          setFilterModalVisible(false);
        }}
      />
    </View>
  );
};

export default HistoryScreen;
