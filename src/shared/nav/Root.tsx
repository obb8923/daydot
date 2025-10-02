import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import { AppStack } from "@nav/App";
import { OnboardingStack } from "@nav/Onboarding";
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
 AppStack:undefined,
 OnboardingStack:undefined,
};
export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AppStack">
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
    </Stack.Navigator>
  );
};
