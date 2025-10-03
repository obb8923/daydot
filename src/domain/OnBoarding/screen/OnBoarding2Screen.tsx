import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useFirstVisitStore } from '@store/firstVisitStore'
import { useBirthDateStore } from '@store/birthDateStore'

export const OnBoarding2Screen = () => {
  const { setFirstVisitCompleted } = useFirstVisitStore();
  const { setBirthDate } = useBirthDateStore();
  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleComplete = async () => {
    try {
      // 생년월일 저장
      await setBirthDate(date);
      // 온보딩 완료 처리
      await setFirstVisitCompleted();
    } catch (error) {
      console.error('온보딩 완료 처리 중 오류:', error);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-2xl font-bold mb-5">생년월일을 알려주세요</Text>
      <Text className="text-base text-center mb-10 text-gray-600">정확한 생년월일을 입력해주세요.</Text>
      
      <TouchableOpacity 
        className="bg-white px-5 py-4 rounded-lg border border-gray-300 mb-10 items-center min-w-50"
        onPress={() => setShowPicker(true)}
      >
        <Text className="text-lg font-semibold text-gray-800 mb-1">
          {formatDate(date)}
        </Text>
        <Text className="text-xs text-gray-500">탭하여 변경</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}

      <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-lg" onPress={handleComplete}>
        <Text className="text-white text-base font-bold">시작하기</Text>
      </TouchableOpacity>
    </View>
  )
}
