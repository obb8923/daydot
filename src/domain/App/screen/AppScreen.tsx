import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import { Background } from '@component/Background';
import {BottomNavigation} from '@domain/App/component/BottomNavigation';
import {LifetimeScreen} from '@domain/App/screen/LifetimeScreen';
import {YearlyScreen} from '@domain/App/screen/YearlyScreen';
import { PADDING_HORIZONTAL } from '@constant/layout';
import { ScreenType } from '@constant/normal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('yearly');
  const insets = useSafeAreaInsets();
  // 화면 전환 핸들러
  const handleScreenChange = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };


  return (
    <Background style={{width: '100%', height: '100%', paddingHorizontal:PADDING_HORIZONTAL}}>
      {/* 현재 화면에 따라 다른 컴포넌트 렌더링 */}
      {currentScreen === 'lifetime' ? <LifetimeScreen /> : <YearlyScreen />}
      
      <View className="absolute w-full self-center" 
      style={{bottom: Platform.OS === 'android' ? insets.bottom * 2 : insets.bottom / 2 }}>
        <BottomNavigation 
          onScreenChange={handleScreenChange} 
          currentScreen={currentScreen}
        />
      </View>
    </Background>
  );
};


