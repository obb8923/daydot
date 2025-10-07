import './global.css';
import 'react-native-gesture-handler'; //라이브러리 초기화
import './src/zi18n'; // 반드시 App 진입점에서 import
import React, { useEffect } from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStack} from './src/shared/nav/Root';
import { useLanguageStore } from './src/shared/store/languageStore';
import { useFirstVisitStore } from './src/shared/store/firstVisitStore';
import { useBirthDateStore } from './src/shared/store/birthDateStore';
import { useLoadSelectedColors } from './src/shared/store/colorStore';


export default function App() {
  const loadLanguage = useLanguageStore((state) => state.loadLanguage);
  const { checkFirstVisit } = useFirstVisitStore();
  const { loadBirthDate } = useBirthDateStore();
  const loadSelectedColors = useLoadSelectedColors();

  useEffect(() => {
    // 모든 초기화 작업을 동시에 로드
    const initializeApp = async () => {
      await Promise.all([
        loadLanguage(),
        checkFirstVisit(),
        loadBirthDate(),
        loadSelectedColors()
      ]);
    };
    
    initializeApp();
  }, []);

  return (
      <GestureHandlerRootView style={{flex:1}}>
        <SafeAreaProvider>
                <NavigationContainer>
                  <StatusBar barStyle="light-content" translucent={true}/>
                  <RootStack />
                </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}