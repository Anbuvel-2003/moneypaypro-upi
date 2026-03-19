import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Landmark, Plus } from 'lucide-react-native';
import GlassView from '../GlassView';

const AddBankOption = ({ onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      className="mb-8"
    >
      <GlassView className="p-5 rounded-[24px] border border-primary/20 bg-primary/5">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center mr-4">
            <Landmark size={24} color="#9D174D" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg mb-0.5">Add a bank account</Text>
            <Text className="text-primary/60 text-xs">Send and receive money with UPI</Text>
          </View>
          <View className="bg-primary p-1.5 rounded-full">
            <Plus size={18} color="#fff" strokeWidth={3} />
          </View>
        </View>
      </GlassView>
    </TouchableOpacity>
  );
};

export default AddBankOption;
