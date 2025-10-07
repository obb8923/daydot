import React from 'react';
import { AppStack } from "@nav/App";
import { OnboardingStack } from "@nav/Onboarding";
import { useFirstVisitStore } from "@store/firstVisitStore";
import { SpinnerScreen } from "@/shared/component/SpinnerScreen";

export type RootStackParamList = {
 AppStack:undefined,
 OnboardingStack:undefined,
};

export const RootStack = () => {
  const { isFirstVisit, isLoading } = useFirstVisitStore();

  if (isLoading) {
    return <SpinnerScreen />;
  }
  
  // 첫 방문자인지에 따라 다른 화면을 렌더링
  if (isFirstVisit) {
    return <OnboardingStack />;
  } else {
    return <AppStack />;
  }
};
