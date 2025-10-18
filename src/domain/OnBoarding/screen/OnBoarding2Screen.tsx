import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFirstVisitStore } from '@store/firstVisitStore'
import { useBirthDateStore } from '@store/birthDateStore'
import {Background} from '@component/Background';
import {Text} from '@component/Text';
import { LiquidGlassButton } from '@/shared/component/LiquidGlassButton';
import {PADDING_HORIZONTAL} from '@/shared/constant/layout';
import {LiquidGlassView} from '@component/LiquidGlassView';
import { DatePicker } from '@/shared/component/DatePicker';
import {BUTTON_HEIGHT,BUTTON_PADDING} from '@/shared/constant/layout';
import { useTranslation } from 'react-i18next';
import { useMonthName } from '@/shared/hooks/useMonthName';
export const OnBoarding2Screen = () => {
  const { t } = useTranslation();
  const { setFirstVisitCompleted } = useFirstVisitStore();
  const { setBirthDate } = useBirthDateStore();
  const getMonthName = useMonthName();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleDateConfirm = async (confirmedDate: Date) => {
    try {
      await setBirthDate(confirmedDate);
    } catch (error) {
      console.error('생년월일 저장 중 오류:', error);
    }
  };

  const handleDatePickerClose = () => {
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
    return t('dateFormat.yearMonthDay', { 
      year: date.getFullYear(), 
      month: date.getMonth() + 1, 
      day: date.getDate(),
      monthName: getMonthName(date.getMonth() + 1)
    });
  };

  return (
    <Background>      
    <View className="flex-1 justify-between items-center py-12" style={{paddingHorizontal:PADDING_HORIZONTAL}}>
      {/* text */}
    <Text text={t('onboarding.birthDatePrompt')} type="title1" className="mt-40 text-text text-center"/>
    {/* date picker */}
    <View className="w-full">
      <Text text={t('onboarding.birthDate')} type="caption1" className="pl-4 mb-2 text-caption"/>
    <LiquidGlassView style={{marginBottom:100,width:'100%',height:'auto',borderRadius:20,justifyContent:'center',alignItems:'center'}}> 
      <TouchableOpacity 
        className="w-full px-5 py-4 rounded-lg items-center "
        onPress={() => setShowPicker(true)}
      >
        <Text text={formatDate(date)} type="body1" className="mb-1 text-text"/>
      </TouchableOpacity>
      </LiquidGlassView>
      </View>
      <DatePicker
        value={date}
        onChange={handleDateChange}
        onConfirm={handleDateConfirm}
        onClose={handleDatePickerClose}
        maximumDate={new Date()}
        minimumDate={new Date(1900, 0, 1)}
        visible={showPicker}
      />
      {/* button */}
      <LiquidGlassButton onPress={handleComplete} style={{paddingHorizontal:BUTTON_PADDING,height:BUTTON_HEIGHT,width:'auto',justifyContent:'center', alignItems:'center'}}>
        <Text text={t('app.start')} type="body3" className="text-text"/>
      </LiquidGlassButton>
    </View>
    </Background>
  )
}
