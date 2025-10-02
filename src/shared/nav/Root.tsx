import React, { useEffect } from 'react';
import { AppStack } from "@nav/App";
import { OnboardingStack } from "@nav/Onboarding";
import { useFirstVisitStore } from "@store/firstVisitStore";
import { useBirthDateStore } from "@store/birthDateStore";


export type RootStackParamList = {
 AppStack:undefined,
 OnboardingStack:undefined,
};

export const RootStack = () => {
  const { isFirstVisit, isLoading, checkFirstVisit } = useFirstVisitStore();
  const { loadBirthDate } = useBirthDateStore();

  useEffect(() => {
    // 첫 방문 여부와 생년월일을 동시에 로드
    const initializeApp = async () => {
      await Promise.all([
        checkFirstVisit(),
        loadBirthDate()
      ]);
    };
    
    initializeApp();
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
