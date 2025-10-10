import './global.css';
import 'react-native-gesture-handler'; //라이브러리 초기화
import './src/zi18n'; // 반드시 App 진입점에서 import
import React from 'react';
import { StatusBar, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStack} from './src/shared/nav/Root';
import { useAppInitialize } from './src/shared/hooks/useAppInitialize';
import { SpinnerScreen } from './src/shared/component/SpinnerScreen';
import { useThemeStore } from '@store/themeStore';

export default function App() {
  // 앱 초기화
  const { isInitialized } = useAppInitialize();
  const themeIndex = useThemeStore((state) => state.themeIndex);
  
  return (
      <GestureHandlerRootView style={{flex:1}}>
        <SafeAreaProvider>
                <NavigationContainer>
                  <StatusBar barStyle="light-content" translucent={true}/>
                  <View className={`theme-${themeIndex} flex-1`}>
                  { !isInitialized ? <SpinnerScreen /> : <RootStack /> }
                  </View>
                </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}