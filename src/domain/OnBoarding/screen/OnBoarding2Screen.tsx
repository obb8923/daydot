import { View, TouchableOpacity, Platform, Modal } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useFirstVisitStore } from '@store/firstVisitStore'
import { useBirthDateStore } from '@store/birthDateStore'
import {Background} from '@component/Background';
import {Text} from '@component/Text';
import { LiquidGlassButton } from '@/shared/component/LiquidGlassButton';
import {PADDING_HORIZONTAL} from '@/shared/constant/layout';
import {LiquidGlassView} from '@component/LiquidGlassView';
export const OnBoarding2Screen = () => {
  const { setFirstVisitCompleted } = useFirstVisitStore();
  const { setBirthDate } = useBirthDateStore();
  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    // 안드로이드에서는 picker를 닫고, iOS에서는 모달을 유지
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleModalClose = () => {
    setShowPicker(false);
  };

  const handleConfirmDate = () => {
    setShowPicker(false);
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
    <Background>      
    <View className="flex-1 justify-between items-center py-12" style={{paddingHorizontal:PADDING_HORIZONTAL}}>
      {/* text */}
    <Text text={`인생의 여정을 시작한 순간을\n기록해 주세요.`} type="title1" className="mt-40 text-center"/>
    {/* date picker */}
    <View className="w-full">
      <Text text="생년월일" type="caption1" className="pl-4 mb-2"/>
    <LiquidGlassView style={{marginBottom:100,width:'100%',height:'auto',borderRadius:20,justifyContent:'center',alignItems:'center'}}> 
      <TouchableOpacity 
        className="w-full px-5 py-4 rounded-lg items-center "
        onPress={() => setShowPicker(true)}
      >
        <Text text={formatDate(date)} type="body1" className="mb-1"/>
      </TouchableOpacity>
      </LiquidGlassView>
      </View>
      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
      
      {showPicker && Platform.OS === 'ios' && (
        <Modal
          visible={showPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={handleModalClose}
        >
          <View className="flex-1 justify-end bg-black/50">
            {/* modal content */}
            <View className="bg-white rounded-t-3xl p-6">
              {/* modal header buttons */}
              <View className="flex-row justify-end items-center mb-4">
                <TouchableOpacity onPress={handleConfirmDate}>
                  <Text text="확인" type="body2" style={{color:"#3B82F6"}}/>
                </TouchableOpacity>
              </View>
              {/* date picker */}
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
      )}
      {/* button */}
      <LiquidGlassButton onPress={handleComplete} style={{width:'auto',justifyContent:'center', alignItems:'center'}}>
        <Text text="시작하기" type="body3"/>
      </LiquidGlassButton>
    </View>
    </Background>
  )
}
