import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import { AppScreen } from '@domain/App/screen/AppScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
 AppScreen:undefined,
};
export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AppScreen">
      <Stack.Screen name="AppScreen" component={AppScreen} />
    </Stack.Navigator>
  );
};
