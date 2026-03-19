import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { 
  ArrowLeft, 
  HelpCircle,
  Database, // Book Cylinder (fallback for cylinder)
  Smartphone, // Mobile
  Cpu, // SIM (fallback)
  CreditCard, // CC Bill
  Tv, // DTH / Cable
  Play, // Google Play
  Nfc, // NCMC
  Plane, // International Roaming
  Apple, // Apple Store
  Lightbulb, // Electricity
  Banknote, // Loan Repayment
  Flame, // Piped Gas
  Droplets, // Water
  Zap, // Prepaid Meter
  GraduationCap, // Education Fee
  Building, // Municipal Tax
  Key, // Rentals
  Users, // Clubs & Associations
  Building2, // Apartment
  Car, // FASTag
  History, // My Bills
  Search,
  Wifi
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassView from '../components/GlassView';

const { width } = Dimensions.get('window');

const RechargeBillsScreen = () => {
  const navigation = useNavigation();

  const CategoryIcon = ({ icon, label, badge, glassColor = "bg-white/10" }) => (
    <TouchableOpacity className="items-center w-[25%] mb-8" activeOpacity={0.7}>
      <View className="relative">
        <GlassView 
          className={`w-14 h-14 rounded-full border border-white/5 items-center justify-center mb-2 ${glassColor}`}
          blurAmount={10}
        >
          {icon}
        </GlassView>
        {badge && (
          <View className="absolute -top-1 -right-2 bg-red-500 px-1.5 py-0.5 rounded-md">
            <Text className="text-[8px] text-white font-bold">{badge}</Text>
          </View>
        )}
      </View>
      <Text className="text-white/60 text-[10px] text-center px-1 font-medium" numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0B0D0F]">
      {/* Header Row 1 */}
      <View className="flex-row justify-between items-center px-5 pt-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ArrowLeft size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <HelpCircle size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Header Row 2 */}
      <View className="flex-row justify-between items-end px-6 mb-8 mt-2">
        <Text className="text-white text-3xl font-bold">Recharge & Bills</Text>
        <TouchableOpacity className="flex-row items-center bg-slate-800/80 border border-white/10 px-4 py-2 rounded-full">
           <History size={18} color="#fff" className="mr-2" />
           <Text className="text-white font-bold text-sm">My Bills</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Suggested Section */}
        <View className="mb-10">
            <Text className="text-white font-bold text-xl mb-6 ml-2">Suggested for you</Text>
            <GlassView className="p-8 rounded-[40px] bg-slate-900/40 border border-white/5 flex-row justify-between">
                <View className="items-center">
                    <GlassView className="w-16 h-16 rounded-full bg-[#9D174D]/10 border border-[#9D174D]/20 items-center justify-center mb-3">
                        <Database size={28} color="#9D174D" />
                    </GlassView>
                    <Text className="text-white/70 text-[11px] font-medium text-center">Book{"\n"}Cylinder</Text>
                </View>
                <View className="items-center">
                    <GlassView className="w-16 h-16 rounded-full bg-[#9D174D]/10 border border-[#9D174D]/20 items-center justify-center mb-3">
                        <Smartphone size={28} color="#9D174D" />
                    </GlassView>
                    <Text className="text-white/70 text-[11px] font-medium text-center">Mobile{"\n"}Postpaid</Text>
                </View>
                <View className="items-center">
                    <View className="relative">
                        <GlassView className="w-16 h-16 rounded-full bg-[#9D174D]/10 border border-[#9D174D]/20 items-center justify-center mb-3">
                            <Cpu size={28} color="#9D174D" />
                        </GlassView>
                        <View className="absolute -top-1 -right-1 bg-red-500 px-2 py-0.5 rounded-md">
                            <Text className="text-[9px] text-white font-bold">Prepaid</Text>
                        </View>
                    </View>
                    <Text className="text-white/70 text-[11px] font-medium text-center">Get SIM</Text>
                </View>
                <View className="items-center">
                    <GlassView className="w-16 h-16 rounded-full bg-[#9D174D]/10 border border-[#9D174D]/20 items-center justify-center mb-3">
                        <CreditCard size={28} color="#9D174D" />
                    </GlassView>
                    <Text className="text-white/70 text-[11px] font-medium text-center">Credit Card{"\n"}Bill</Text>
                </View>
            </GlassView>
        </View>

        {/* Recharges Section */}
        <View className="mb-8">
            <Text className="text-white font-bold text-xl mb-6 ml-2">Recharges</Text>
            <View className="flex-row flex-wrap justify-between">
                <CategoryIcon icon={<Smartphone size={24} color="#fff" />} label="Mobile Recharge" />
                <CategoryIcon icon={<Car size={24} color="#fff" />} label="FASTag Recharge" />
                <CategoryIcon icon={<Tv size={24} color="#fff" />} label="DTH" />
                <CategoryIcon icon={<Play size={24} color="#fff" />} label="Google Play" />
                <CategoryIcon icon={<Nfc size={24} color="#fff" />} label="NCMC Recharge" />
                <CategoryIcon icon={<Plane size={24} color="#fff" />} label="International Roaming" />
                <CategoryIcon icon={<Tv size={24} color="#fff" />} label="Cable TV" />
                <CategoryIcon icon={<Apple size={24} color="#fff" />} label="Apple Store" />
            </View>
        </View>

        {/* Utilities Section */}
        <View className="mb-8">
            <Text className="text-white font-bold text-xl mb-6 ml-2">Utilities</Text>
            <View className="flex-row flex-wrap justify-start">
                <CategoryIcon icon={<Lightbulb size={24} color="#fff" />} label="Electricity" />
                <CategoryIcon icon={<CreditCard size={24} color="#fff" />} label="Credit Card Bill" />
                <CategoryIcon icon={<Banknote size={24} color="#fff" />} label="Loan Repayment" />
                <CategoryIcon icon={<Database size={24} color="#fff" />} label="Book Cylinder" />
                <CategoryIcon icon={<Smartphone size={24} color="#fff" />} label="Mobile Postpaid" />
                <CategoryIcon icon={<Wifi size={24} color="#fff" />} label="Broadband/ Landline" />
                <CategoryIcon icon={<Flame size={24} color="#fff" />} label="Piped Gas" />
                <CategoryIcon icon={<Droplets size={24} color="#fff" />} label="Water" />
                <CategoryIcon icon={<Zap size={24} color="#fff" />} label="Prepaid Meter" />
                <CategoryIcon icon={<GraduationCap size={24} color="#fff" />} label="Education Fee" />
            </View>
        </View>

        {/* Housing Section */}
        <View className="mb-8">
            <View className="flex-row justify-between items-center mb-6 ml-2">
                <Text className="text-white font-bold text-xl">Housing & Society</Text>
            </View>
            <View className="flex-row flex-wrap justify-start">
                <CategoryIcon icon={<Building name="Municipal Tax" size={24} color="#fff" />} label="Municipal Tax" />
                <CategoryIcon icon={<Key size={24} color="#fff" />} label="Rentals" />
                <CategoryIcon icon={<Users size={24} color="#fff" />} label="Clubs & Associations" />
                <CategoryIcon icon={<Building2 size={24} color="#fff" />} label="Apartment" />
            </View>
        </View>

        {/* Footer Branding */}
        <View className="items-center mt-8 py-8 border-t border-white/5">
            <View className="flex-row items-center opacity-40">
                <Text className="text-white font-medium mr-2">Powered by</Text>
                <Text className="text-white font-bold italic tracking-tight text-xl">BharatConnect</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RechargeBillsScreen;
