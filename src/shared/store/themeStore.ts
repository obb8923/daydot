import { create } from 'zustand';
import { StorageService } from '@service/storageService';
import { Colors } from '@constant/Colors';

// 테마 타입 정의
export interface SelectedTheme {
  themeName: string;
  primary: string;
  background: string;
  text: string;
}

interface ThemeStore {
  // 상태
  selectedTheme: SelectedTheme | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // 액션들
  loadSelectedTheme: () => Promise<void>;
  setSelectedTheme: (theme: SelectedTheme) => Promise<void>;
  clearSelectedTheme: () => Promise<void>;
  resetToDefaultTheme: () => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// 기본 테마 설정
const defaultTheme: SelectedTheme = {
  themeName: '0',
  primary: Colors.p0,
  background: Colors.b0,
  text: Colors.t0,
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  // 초기 상태 - 기본 테마로 시작하여 깜빡임 방지
  selectedTheme: defaultTheme,
  isLoading: false,
  error: null,
  isInitialized: false,
  
  // 선택된 테마 로드 (앱 시작 시 한 번만 호출)
  loadSelectedTheme: async () => {
    const { isInitialized } = get();
    
    // 이미 초기화되었다면 다시 로드하지 않음
    if (isInitialized) {
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      const savedTheme = await StorageService.getSelectedColors();
      
      // 저장된 테마가 있으면 해당 테마 사용, 없으면 현재 기본 테마 유지
      if (savedTheme) {
        set({ 
          selectedTheme: savedTheme, 
          isLoading: false, 
          isInitialized: true 
        });
      } else {
        // 저장된 테마가 없으면 기본 테마 유지 (이미 초기화됨)
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
        // 오류 시에도 기본 테마 유지 (이미 초기화됨)
      });
    }
  },
  
  // 선택된 테마 설정
  setSelectedTheme: async (theme: SelectedTheme) => {
    try {
      set({ isLoading: true, error: null });
      await StorageService.setSelectedColors(theme);
      set({ 
        selectedTheme: theme, 
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
  
  // 선택된 테마 삭제 (기본 테마로 복원)
  clearSelectedTheme: async () => {
    try {
      set({ isLoading: true, error: null });
      await StorageService.removeSelectedColors();
      set({ 
        selectedTheme: defaultTheme, 
        isLoading: false 
      });
    } catch (error) {
      console.error('선택된 테마 삭제 중 오류:', error);
      set({ 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        isLoading: false 
      });
    }
  },
  
  // 기본 테마로 리셋
  resetToDefaultTheme: async () => {
    await get().clearSelectedTheme();
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
export const useSelectedTheme = () => useThemeStore(state => state.selectedTheme);
export const useLoadSelectedTheme = () => useThemeStore(state => state.loadSelectedTheme);
export const useSetSelectedTheme = () => useThemeStore(state => state.setSelectedTheme);
export const useClearSelectedTheme = () => useThemeStore(state => state.clearSelectedTheme);
export const useResetToDefaultTheme = () => useThemeStore(state => state.resetToDefaultTheme);

