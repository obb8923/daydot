import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Background} from '@component/Background';
import {Colors} from '@constant/Colors';
import { GOOGLE_FORM_URL } from '@constant/normal';
import { SettingStackParamList } from '@nav/Setting';
import {LiquidGlassButton} from '@component/LiquidGlassButton';
import { BUTTON_HEIGHT } from '@constant/layout';
import ChevronLeftIcon from '@assets/svg/ChevronLeft.svg';
type SettingScreenNavigationProp = NativeStackNavigationProp<SettingStackParamList>;



export const WebviewScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  
  return (
    <Background>
    <View className="flex-1 bg-white">
      <LiquidGlassButton onPress={() => navigation.goBack()} style={{width:BUTTON_HEIGHT,height:BUTTON_HEIGHT,justifyContent:'center', alignItems:'center'}}>
        <ChevronLeftIcon width={10} height={15} color={'white'}/>
      </LiquidGlassButton>
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
    </View>
    </Background>
  );
};
