import React, {useState} from 'react';
import {View} from 'react-native';
import { Background } from '@component/Background';
import {BottomNavigation} from '@domain/App/component/BottomNavigation';
import {LifetimeScreen} from '@domain/App/component/LifetimeScreen';
import {YearlyScreen} from '@domain/App/component/YearlyScreen';
import { PADDING_HORIZONTAL } from '@constant/layout';
import { ScreenType } from '@constant/normal';


export const AppScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('yearly');

  // 화면 전환 핸들러
  const handleScreenChange = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };


  return (
    <Background style={{width: '100%', height: '100%', paddingHorizontal:PADDING_HORIZONTAL}}>
      {/* 현재 화면에 따라 다른 컴포넌트 렌더링 */}
      {currentScreen === 'lifetime' ? <LifetimeScreen /> : <YearlyScreen />}
      
      <View className="absolute bottom-0 w-full self-center">
        <BottomNavigation 
          onScreenChange={handleScreenChange} 
          currentScreen={currentScreen}
        />
      </View>
    </Background>
  );
};


