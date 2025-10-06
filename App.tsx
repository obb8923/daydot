import './global.css';
import 'react-native-gesture-handler'; //라이브러리 초기화
import React from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStack} from './src/shared/nav/Root';


export default function App() {
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