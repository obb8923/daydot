import { create } from 'zustand';
import { StorageService } from '@service/storageService';

interface BirthDateStore {
  // 상태
  birthDate: Date | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // 액션들
  loadBirthDate: () => Promise<void>;
  setBirthDate: (date: Date) => Promise<void>;
  clearBirthDate: () => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // 유틸리티
  getCurrentAge: () => number;
}

export const useBirthDateStore = create<BirthDateStore>((set, get) => ({
  // 초기 상태
  birthDate: null,
  isLoading: false,
  error: null,
  isInitialized: false,
  
  // 생년월일 로드 (앱 시작 시 한 번만 호출)
  loadBirthDate: async () => {
    const { isInitialized } = get();
    
    // 이미 초기화되었다면 다시 로드하지 않음
    if (isInitialized) {
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      const birthDate = await StorageService.getBirthDate();
      set({ 
        birthDate, 
        isLoading: false, 
        isInitialized: true 
      });
    } catch (error) {
      console.error('생년월일 로드 중 오류:', error);
      set({ 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        isLoading: false,
        isInitialized: true
      });
    }
  },
  
  // 생년월일 설정
  setBirthDate: async (date: Date) => {
    try {
      set({ isLoading: true, error: null });
      await StorageService.setBirthDate(date);
      set({ 
        birthDate: date, 
        isLoading: false 
      });
    } catch (error) {
      console.error('생년월일 저장 중 오류:', error);
      set({ 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        isLoading: false 
      });
    }
  },
  
  // 생년월일 삭제
  clearBirthDate: async () => {
    try {
      set({ isLoading: true, error: null });
      await StorageService.removeBirthDate();
      set({ 
        birthDate: null, 
        isLoading: false 
      });
    } catch (error) {
      console.error('생년월일 삭제 중 오류:', error);
      set({ 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        isLoading: false 
      });
    }
  },
  
  // 로딩 상태 설정
  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  
  // 에러 상태 설정
  setError: (error: string | null) => {
    set({ error });
  },
  
  // 현재 나이 계산
  getCurrentAge: () => {
    const { birthDate } = get();
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  },
}));
