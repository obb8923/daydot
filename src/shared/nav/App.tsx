import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import { AppScreen } from '@domain/App/screen/AppScreen';
import { SettingScreen } from '@domain/Setting/screen/SettingScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
 AppScreen:undefined,
 SettingScreen:undefined,
};
export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AppScreen">
      <Stack.Screen name="AppScreen" component={AppScreen} />
      <Stack.Screen 
      name="SettingScreen" 
      component={SettingScreen} 
      options={() => ({
        animation: 'slide_from_left',
      })}/>
    </Stack.Navigator>
  );
};
