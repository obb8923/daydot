import React from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Background} from '@component/Background';
import { useThemeColors } from '@store/themeStore';
import { GOOGLE_FORM_URL_KO, GOOGLE_FORM_URL_EN } from '@constant/normal';
import { SettingStackParamList } from '@nav/Setting';
import {useTranslation} from 'react-i18next';

type SettingScreenNavigationProp = NativeStackNavigationProp<SettingStackParamList>;

export const WebviewScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const { t, i18n } = useTranslation();
  const { primary } = useThemeColors();
  return (
    <Background style={{backgroundColor:'#d9d9d9'}}>
      <View className='w-full h-14 justify-center items-start px-6 py-2'>
      <TouchableOpacity 
      onPress={() => navigation.goBack()} 
      className='w-20 h-full justify-center items-center bg-[#000000] rounded'
      >
        <Text className='text-white'>{t('app.back')}</Text>
      </TouchableOpacity>
      </View>
      {/* WebView */}
      <WebView
        source={{ uri: i18n.language === 'ko' ? GOOGLE_FORM_URL_KO : GOOGLE_FORM_URL_EN }}
        className="flex-1"
        startInLoadingState={true}
        renderLoading={() => (
            <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={primary} />
        </View>
    )}
        onError={(syntheticEvent: any) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </Background>
  );
};
