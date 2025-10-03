import './global.css';
import 'react-native-gesture-handler';
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
                  <StatusBar barStyle="dark-content" translucent={true}/>
                  <RootStack />
                </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}