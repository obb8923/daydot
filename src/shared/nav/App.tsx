import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import { AppScreen } from '@domain/App/screen/AppScreen';
import { SettingStack } from '@nav/Setting';
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
 AppScreen:undefined,
 SettingStack:undefined,
};
export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AppScreen">
      <Stack.Screen name="AppScreen" component={AppScreen} />
      <Stack.Screen 
      name="SettingStack" 
      component={SettingStack} 
      options={() => ({
        animation: 'slide_from_left',
      })}/>
    </Stack.Navigator>
  );
};
