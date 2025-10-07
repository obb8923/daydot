import React from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Background} from '@component/Background';
import {Colors} from '@constant/Colors';
import { GOOGLE_FORM_URL } from '@constant/normal';
import { SettingStackParamList } from '@nav/Setting';

type SettingScreenNavigationProp = NativeStackNavigationProp<SettingStackParamList>;

export const WebviewScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  
  return (
    <Background style={{backgroundColor:'#d9d9d9'}}>
      <View className='w-full h-14 justify-center items-start px-6 py-2'>
      <TouchableOpacity 
      onPress={() => navigation.goBack()} 
      className='w-20 h-full justify-center items-center bg-[#000000] rounded'
      >
        <Text className='text-white'>뒤로가기</Text>
      </TouchableOpacity>
      </View>
      {/* WebView */}
      <WebView
        source={{ uri: GOOGLE_FORM_URL }}
        className="flex-1"
        startInLoadingState={true}
        renderLoading={() => (
            <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={Colors.primary} />
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
