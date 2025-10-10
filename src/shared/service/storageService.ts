import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_VISIT_KEY = 'daydot:first_visit_completed';
const LAST_REVIEW_REQUEST_KEY = 'daydot:last_review_request_date';
const BIRTH_DATE_KEY = 'daydot:birth_date';
const SELECTED_COLORS_KEY = 'daydot:selected_colors';
const MEMO_PREFIX_KEY = 'daydot:memo:'; // daydot:memo:MMDD

export const StorageService = {
  isFirstVisit: async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(FIRST_VISIT_KEY);
      // 값이 없으면 첫 방문으로 간주
      return value !== 'true';
    } catch (error) {
      console.error('AsyncStorage 읽기 오류:', error);
      // 오류 시 보수적으로 온보딩을 다시 보여준다
      return true;
    }
  },

  setFirstVisitCompleted: async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(FIRST_VISIT_KEY, 'true');
    } catch (error) {
      console.error('AsyncStorage 쓰기 오류:', error);
      throw error;
    }
  },

  resetFirstVisit: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(FIRST_VISIT_KEY);
    } catch (error) {
      console.error('AsyncStorage 제거 오류:', error);
      throw error;
    }
  },

  // 앱스토어 평가 요청 관련 함수들
  getLastReviewRequestDate: async (): Promise<Date | null> => {
    try {
      const value = await AsyncStorage.getItem(LAST_REVIEW_REQUEST_KEY);
      return value ? new Date(value) : null;
    } catch (error) {
      console.error('AsyncStorage 읽기 오류:', error);
      return null;
    }
  },

  setLastReviewRequestDate: async (date: Date): Promise<void> => {
    try {
      await AsyncStorage.setItem(LAST_REVIEW_REQUEST_KEY, date.toISOString());
    } catch (error) {
      console.error('AsyncStorage 쓰기 오류:', error);
      throw error;
    }
  },

  shouldShowReviewRequest: async (): Promise<boolean> => {
    try {
      const lastDate = await StorageService.getLastReviewRequestDate();
      // console.log('lastDate', lastDate?.toISOString());
      if (!lastDate) {
        return true; // 처음이면 요청 보여주기
      }
      
      const now = new Date();
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      
      return lastDate < threeMonthsAgo;
    } catch (error) {
      console.error('평가 요청 확인 오류:', error);
      return false; // 오류 시 요청하지 않음
    }
  },

  // 생년월일 관련 함수들
  getBirthDate: async (): Promise<Date | null> => {
    try {
      const value = await AsyncStorage.getItem(BIRTH_DATE_KEY);
      return value ? new Date(value) : null;
    } catch (error) {
      console.error('생년월일 읽기 오류:', error);
      return null;
    }
  },

  setBirthDate: async (date: Date): Promise<void> => {
    try {
      await AsyncStorage.setItem(BIRTH_DATE_KEY, date.toISOString());
    } catch (error) {
      console.error('생년월일 저장 오류:', error);
      throw error;
    }
  },

  removeBirthDate: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(BIRTH_DATE_KEY);
    } catch (error) {
      console.error('생년월일 제거 오류:', error);
      throw error;
    }
  },

  // 테마 관련 함수들
  getSelectedColors: async (): Promise<{ themeIndex: number } | null> => {
    try {
      const value = await AsyncStorage.getItem(SELECTED_COLORS_KEY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('선택된 테마 읽기 오류:', error);
      return null;
    }
  },

  setSelectedColors: async (theme: { themeIndex: number }): Promise<void> => {
    try {
      await AsyncStorage.setItem(SELECTED_COLORS_KEY, JSON.stringify(theme));
    } catch (error) {
      console.error('선택된 테마 저장 오류:', error);
      throw error;
    }
  },

  removeSelectedColors: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(SELECTED_COLORS_KEY);
    } catch (error) {
      console.error('선택된 색상 제거 오류:', error);
      throw error;
    }
  },
  
  // 메모 관련 함수들 (월/일 기준 키: MMDD)
  getMemoByMonthDay: async (month: number, day: number): Promise<string | null> => {
    try {
      const key = `${MEMO_PREFIX_KEY}${month.toString().padStart(2, '0')}${day
        .toString()
        .padStart(2, '0')}`;
      const value = await AsyncStorage.getItem(key);
      return value ?? null;
    } catch (error) {
      console.error('메모 읽기 오류:', error);
      return null;
    }
  },

  setMemoByMonthDay: async (month: number, day: number, text: string): Promise<void> => {
    try {
      const key = `${MEMO_PREFIX_KEY}${month.toString().padStart(2, '0')}${day
        .toString()
        .padStart(2, '0')}`;
      await AsyncStorage.setItem(key, text);
    } catch (error) {
      console.error('메모 저장 오류:', error);
      throw error;
    }
  },

  removeMemoByMonthDay: async (month: number, day: number): Promise<void> => {
    try {
      const key = `${MEMO_PREFIX_KEY}${month.toString().padStart(2, '0')}${day
        .toString()
        .padStart(2, '0')}`;
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('메모 제거 오류:', error);
      throw error;
    }
  },
};


