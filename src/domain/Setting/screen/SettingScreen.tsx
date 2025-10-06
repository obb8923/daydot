import { View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Background } from '@component/Background'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SettingStackParamList } from '@nav/Setting';
import { BUTTON_HEIGHT } from '@constant/layout';
import ChevronLeftIcon from '@assets/svg/ChevronLeft.svg';
import { LiquidGlassButton } from '@component/LiquidGlassButton';
import { SettingItem } from '@domain/Setting/component/SettingItem';
import { SettingGroup } from '@domain/Setting/component/SettingGroup';
import { DividingLine } from '@domain/Setting/component/DividingLine';
import { useBirthDateStore } from '@store/birthDateStore';
import { DatePicker } from '@component/DatePicker';
import { MAIL_ADDRESS } from '@constant/normal';

type SettingScreenNavigationProp = NativeStackNavigationProp<SettingStackParamList>;

export const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const { birthDate, setBirthDate } = useBirthDateStore();
  
  const [showDatePicker, setShowDatePicker] = useState(false);


  const handleDateConfirm = async (confirmedDate: Date) => {
    try {
      await setBirthDate(confirmedDate);
      setShowDatePicker(false);
    } catch (error) {
      console.error('생년월일 저장 중 오류:', error);
    }
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <Background>
      <View className="flex-1 p-5">
        {/* Back Button section */}
        <View className="w-full flex-row mb-6" style={{height:BUTTON_HEIGHT}}>
          <LiquidGlassButton 
            onPress={() => navigation.goBack()} 
            style={{width:BUTTON_HEIGHT,height:BUTTON_HEIGHT,justifyContent:'center', alignItems:'center'}}>
            <ChevronLeftIcon width={10} height={15} color={'white'}/>
          </LiquidGlassButton>
        </View>

        {/* Setting List section */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* 생년월일 변경 그룹 */}
          <SettingGroup>
            <SettingItem
              title="생년월일 변경"
              subtitle={formatDate(birthDate??new Date())}
              onPress={() => setShowDatePicker(true)}
            />
            {/* <DividingLine /> */}
           
          </SettingGroup>
          {/* 앱 설정 그룹 */}
          <SettingGroup>
            <SettingItem
              title="문의하기"
              subtitle="이메일로 문의하기"              
              onPress={() => Alert.alert('이메일로 문의하기',`이메일 주소:\n${MAIL_ADDRESS}\n감사합니다!`)}
            />
            <DividingLine />
            <SettingItem
              title="건의하기"
              subtitle="건의사항 및 의견 보내기"              
              onPress={() => navigation.navigate('Webview')}
            />
           
            {/* <DividingLine /> */}
           
          </SettingGroup>

   

          {/* 정보 그룹 */}
          <SettingGroup>
            {/* <SettingItem
              title="앱 정보"
              subtitle="버전 1.0.0"
              icon={<FileIcon width={20} height={20} color="white" />}
             
              onPress={() => console.log('앱 정보 클릭')}
            />
            
            <SettingItem
              title="개발자 정보"
              subtitle="DayDot Team"
              icon={<SettingIcon width={20} height={20} color="white" />}
             
              onPress={() => console.log('개발자 정보 클릭')}
            /> */}
            
            <SettingItem
              title="이용약관"
              subtitle="서비스 이용약관"
              onPress={() => console.log('이용약관 클릭')}
            />
            <DividingLine />
            <SettingItem
              title="개인정보처리방침"
              subtitle="개인정보 보호정책"             
              onPress={() => console.log('개인정보처리방침 클릭')}
            />
          </SettingGroup>
        </ScrollView>
      </View>

      <DatePicker
        value={birthDate??new Date()}
        onChange={setBirthDate}
        onConfirm={handleDateConfirm}
        onClose={handleDatePickerClose}
        maximumDate={new Date()}
        minimumDate={new Date(1900, 0, 1)}
        visible={showDatePicker}
      />
    </Background>
  )
}