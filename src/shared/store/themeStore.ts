import { create } from 'zustand';
import { StorageService } from '@service/storageService';
// 테마 색상 가져오기
import { THEMES } from '@constant/theme';

interface ThemeStore {
  // 상태
  themeIndex: number;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // 액션들
  loadThemeIndex: () => Promise<void>;
  setThemeIndex: (index: number) => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  themeIndex: 0,
  isLoading: false,
  error: null,
  isInitialized: false,
  
  // 선택된 테마 인덱스 로드 (앱 시작 시 한 번만 호출)
  loadThemeIndex: async () => {
    const { isInitialized } = get();
    
    // 이미 초기화되었다면 다시 로드하지 않음
    if (isInitialized) {
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      const savedTheme = await StorageService.getSelectedColors();
      
      // 저장된 테마가 있으면 해당 테마 인덱스 사용
      if (savedTheme && typeof savedTheme.themeIndex === 'number') {
        set({ 
          themeIndex: savedTheme.themeIndex, 
          isLoading: false, 
          isInitialized: true 
        });
      } else {
        // 저장된 테마가 없으면 기본 테마(0) 유지 
        set({ 
          isLoading: false, 
          isInitialized: true 
        });
      }
    } catch (error) {
      console.error('선택된 테마 로드 중 오류:', error);
      set({ 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        isLoading: false,
        isInitialized: true
      });
    }
  },
  
  // 선택된 테마 인덱스 설정
  setThemeIndex: async (index: number) => {
    try {
      set({ isLoading: true, error: null });
      // 저장 형식은 기존과 호환되도록 유지
      await StorageService.setSelectedColors({ themeIndex: index });
      set({ 
        themeIndex: index, 
        isLoading: false 
      });
    } catch (error) {
      console.error('선택된 테마 저장 중 오류:', error);
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
}));

// 편의 함수들
export const useThemeIndex = () => useThemeStore(state => state.themeIndex);
export const useLoadThemeIndex = () => useThemeStore(state => state.loadThemeIndex);
export const useSetThemeIndex = () => useThemeStore(state => state.setThemeIndex);
export const useThemeColors = () => {
  const themeIndex = useThemeStore(state => state.themeIndex);
  const theme = THEMES[themeIndex] || THEMES[0];
  return {
    primary: theme.primary,
    background: theme.background,
    text: theme.text,
    caption: theme.caption,
  };
};