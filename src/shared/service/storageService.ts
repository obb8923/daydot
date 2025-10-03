import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_VISIT_KEY = 'daydot:first_visit_completed';
const LAST_REVIEW_REQUEST_KEY = 'daydot:last_review_request_date';
const BIRTH_DATE_KEY = 'daydot:birth_date';
const SELECTED_COLORS_KEY = 'daydot:selected_colors';

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

  // 색상 관련 함수들
  getSelectedColors: async (): Promise<{ primary: string; background: string; text: string } | null> => {
    try {
      const value = await AsyncStorage.getItem(SELECTED_COLORS_KEY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('선택된 색상 읽기 오류:', error);
      return null;
    }
  },

  setSelectedColors: async (colors: { primary: string; background: string; text: string }): Promise<void> => {
    try {
      await AsyncStorage.setItem(SELECTED_COLORS_KEY, JSON.stringify(colors));
    } catch (error) {
      console.error('선택된 색상 저장 오류:', error);
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
};


