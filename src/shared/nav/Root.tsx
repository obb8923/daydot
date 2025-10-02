import React, { useEffect } from 'react';
import { AppStack } from "@nav/App";
import { OnboardingStack } from "@nav/Onboarding";
import { useFirstVisitStore } from "@store/firstVisitStore";


export type RootStackParamList = {
 AppStack:undefined,
 OnboardingStack:undefined,
};

export const RootStack = () => {
  const { isFirstVisit, isLoading, checkFirstVisit } = useFirstVisitStore();

  useEffect(() => {
    checkFirstVisit();
  }, []);

  if (isLoading) {
    return null; // 또는 로딩 스피너 컴포넌트
  }

  // 첫 방문자인지에 따라 다른 화면을 렌더링
  if (isFirstVisit) {
    return <OnboardingStack />;
  } else {
    return <AppStack />;
  }
};
