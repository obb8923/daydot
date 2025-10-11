import { useEffect, useState } from 'react';
import { useLanguageStore } from '@store/languageStore';
import { useFirstVisitStore } from '@store/firstVisitStore';
import { useBirthDateStore } from '@store/birthDateStore';
import { useLoadThemeIndex, useThemeIndex } from '@store/themeStore';
import { WidgetService } from '@service/widgetService';
import { AppState } from 'react-native';

/**
 * 앱 초기화 커스텀 훅
 * 모든 store의 초기 데이터를 로드합니다.
 */
export const useAppInitialize = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadLanguage = useLanguageStore((state) => state.loadLanguage);
  const { checkFirstVisit } = useFirstVisitStore();
  const { loadBirthDate } = useBirthDateStore();
  const loadThemeIndex = useLoadThemeIndex();
  const themeIndex = useThemeIndex();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 모든 초기화 작업을 병렬로 실행
        await Promise.all([
          loadLanguage(),
          checkFirstVisit(),
          loadBirthDate(),
          loadThemeIndex(),
        ]);
        
        setIsInitialized(true);
      } catch (err) {
        console.error('앱 초기화 중 오류:', err);
        setError(err instanceof Error ? err : new Error('알 수 없는 오류'));
        setIsInitialized(true); // 에러가 있어도 초기화는 완료로 처리
      }
    };

    initializeApp();
  }, [loadLanguage, checkFirstVisit, loadBirthDate, loadThemeIndex]);

  // 위젯 데이터 업데이트
  useEffect(() => {
    if (isInitialized) {
      // 앱 초기화 후 위젯 데이터 업데이트
      WidgetService.updateWidgetWithCurrentData(themeIndex);

      // 앱이 foreground로 올 때마다 위젯 데이터 업데이트
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'active') {
          WidgetService.updateWidgetWithCurrentData(themeIndex);
        }
      });

      return () => {
        subscription.remove();
      };
    }
  }, [isInitialized, themeIndex]);

  return { isInitialized, error };
};

