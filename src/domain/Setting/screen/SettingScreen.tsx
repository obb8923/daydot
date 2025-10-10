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
import { TermsAndPrivacyPolicyModal } from '@/domain/Setting/component/Modal/TermsAndPrivacyPolicyModal';
import { LanguageSwitcher } from '@/domain/Setting/component/Modal/LanguageSwitcher';
import { ThemeSwitcher } from '@/domain/Setting/component/Modal/ThemeSwitcher';
import { useLanguageStore } from '@store/languageStore';
import { useColorStore } from '@store/colorStore';
import { useTranslation } from 'react-i18next';
import { useMonthName } from '@/shared/hooks/useMonthName';
import { Colors } from '@constant/Colors';
type SettingScreenNavigationProp = NativeStackNavigationProp<SettingStackParamList>;

export const SettingScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const { birthDate, setBirthDate } = useBirthDateStore();
  const { language } = useLanguageStore();
  const { selectedColors } = useColorStore();
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTermsAndPrivacyPolicyModal, setShowTermsAndPrivacyPolicyModal] = useState(false);
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms'>('terms');
  const getMonthName = useMonthName();
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
    return t('dateFormat.yearMonthDay', { 
      year: date.getFullYear(), 
      month: date.getMonth() + 1, 
      day: date.getDate(),
      monthName: getMonthName(date.getMonth() + 1)
    });
  };

  const getLanguageName = (code: string) => {
    return t(`language.${code}`);
  };

  const getThemeName = () => {
    const themes = [
      { primary: Colors.p0, background: Colors.b0, text: Colors.t0, id: '0' },
      { primary: Colors.p1, background: Colors.b1, text: Colors.t1, id: '1' },
      { primary: Colors.p2, background: Colors.b2, text: Colors.t2, id: '2' },
      { primary: Colors.p3, background: Colors.b3, text: Colors.t3, id: '3' },
      { primary: Colors.p4, background: Colors.b4, text: Colors.t4, id: '4' },
      { primary: Colors.p5, background: Colors.b5, text: Colors.t5, id: '5' },
      { primary: Colors.p6, background: Colors.b6, text: Colors.t6, id: '6' },
      { primary: Colors.p7, background: Colors.b7, text: Colors.t7, id: '7' },
      { primary: Colors.p8, background: Colors.b8, text: Colors.t8, id: '8' },
    ];
    
    const currentTheme = themes.find(
      theme => 
        theme.primary === selectedColors?.primary &&
        theme.background === selectedColors?.background &&
        theme.text === selectedColors?.text
    );
    
    return currentTheme ? t(`theme.${currentTheme.id}`) : t('theme.0');
  };

  return (
    <Background>
      <View className="flex-1 p-4">
        {/* Back Button section */}
        <View className="absolute top-4 left-4 flex-row mb-6" style={{height:BUTTON_HEIGHT,zIndex:100}}>
          <LiquidGlassButton 
            onPress={() => navigation.goBack()} 
            style={{width:BUTTON_HEIGHT,height:BUTTON_HEIGHT,justifyContent:'center', alignItems:'center'}}>
            <ChevronLeftIcon width={10} height={15} color={'white'}/>
          </LiquidGlassButton>
        </View>

        {/* Setting List section */}
        <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop:BUTTON_HEIGHT + 16}}
        >
          {/* 앱 정보 변경 - 생년월일 ,테마,언어 */}
          <SettingGroup>
            <SettingItem
              title={t('setting.changeBirthday')}
              subtitle={formatDate(birthDate??new Date())}
              onPress={() => setShowDatePicker(true)}
            />
            <DividingLine />
            <SettingItem
              title={t('setting.language')}
              subtitle={getLanguageName(language)}
              onPress={() => setShowLanguageSwitcher(true)}
            />
            <DividingLine />
            <SettingItem
              title={t('setting.theme')}
              subtitle={getThemeName()}
              onPress={() => setShowThemeSwitcher(true)}
            />
          </SettingGroup>
          {/* 앱 설정 그룹 */}
          <SettingGroup>
            
            <SettingItem
              title={t('setting.contact')}
              subtitle={t('setting.contactSubtitle')}              
              onPress={() => Alert.alert(t('setting.contact'), t('setting.contactAlert', { email: MAIL_ADDRESS }))}
            />
            <DividingLine />
            <SettingItem
              title={t('setting.suggest')}
              subtitle={t('setting.suggestSubtitle')}              
              onPress={() => navigation.navigate('Webview')}
            />
           
            {/* <DividingLine /> */}
           
          </SettingGroup>

   

          {/* 정보 그룹 */}
          {/* <SettingGroup>
            <SettingItem
              title="이용약관"
              subtitle="서비스 이용약관"
              onPress={() => {
                setModalType('terms');
                setShowTermsAndPrivacyPolicyModal(true);
              }}
            />
            <DividingLine />
            <SettingItem
              title="개인정보처리방침"
              subtitle="개인정보 보호정책"             
              onPress={() => {
                setModalType('privacy');
                setShowTermsAndPrivacyPolicyModal(true);
              }}
            />
          </SettingGroup> */}
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
      {/* <TermsAndPrivacyPolicyModal
        type={modalType}
        visible={showTermsAndPrivacyPolicyModal}
        onClose={() => setShowTermsAndPrivacyPolicyModal(false)}
      /> */}
      <LanguageSwitcher
        visible={showLanguageSwitcher}
        onClose={() => setShowLanguageSwitcher(false)}
      />
      <ThemeSwitcher
        visible={showThemeSwitcher}
        onClose={() => setShowThemeSwitcher(false)}
      />
    </Background>
  )
}