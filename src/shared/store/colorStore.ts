import { create } from 'zustand';
import { StorageService } from '@service/storageService';
import { Colors } from '@constant/Colors';
// 색상 타입 정의
export interface SelectedColors {
  primary: string;
  background: string;
  text: string;
}
interface ColorStore {
  // 상태
  selectedColors: SelectedColors | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // 액션들
  loadSelectedColors: () => Promise<void>;
  setSelectedColors: (colors: SelectedColors) => Promise<void>;
  clearSelectedColors: () => Promise<void>;
  resetToDefaultColors: () => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// 기본 색상 설정
const defaultColors: SelectedColors = {
  primary: Colors.p2,
  background: Colors.b2,
  text: Colors.black,
};

export const useColorStore = create<ColorStore>((set, get) => ({
  // 초기 상태
  selectedColors: null,
  isLoading: false,
  error: null,
  isInitialized: false,
  
  // 선택된 색상 로드 (앱 시작 시 한 번만 호출)
  loadSelectedColors: async () => {
    const { isInitialized } = get();
    
    // 이미 초기화되었다면 다시 로드하지 않음
    if (isInitialized) {
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      const savedColors = await StorageService.getSelectedColors();
      
      // 저장된 색상이 없으면 기본 색상 사용
      const colors = savedColors || defaultColors;
      
      set({ 
        selectedColors: colors, 
        isLoading: false, 
        isInitialized: true 
      });
    } catch (error) {
      console.error('선택된 색상 로드 중 오류:', error);
      set({ 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        isLoading: false,
        isInitialized: true,
        selectedColors: defaultColors // 오류 시 기본 색상 사용
      });
    }
  },
  
  // 선택된 색상 설정
  setSelectedColors: async (colors: SelectedColors) => {
    try {
      set({ isLoading: true, error: null });
      await StorageService.setSelectedColors(colors);
      set({ 
        selectedColors: colors, 
        isLoading: false 
      });
    } catch (error) {
      console.error('선택된 색상 저장 중 오류:', error);
      set({ 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        isLoading: false 
      });
    }
  },
  
  // 선택된 색상 삭제 (기본 색상으로 복원)
  clearSelectedColors: async () => {
    try {
      set({ isLoading: true, error: null });
      await StorageService.removeSelectedColors();
      set({ 
        selectedColors: defaultColors, 
        isLoading: false 
      });
    } catch (error) {
      console.error('선택된 색상 삭제 중 오류:', error);
      set({ 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        isLoading: false 
      });
    }
  },
  
  // 기본 색상으로 리셋
  resetToDefaultColors: async () => {
    await get().clearSelectedColors();
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
export const useSelectedColors = () => useColorStore(state => state.selectedColors);
export const useLoadSelectedColors = () => useColorStore(state => state.loadSelectedColors);
export const useSetSelectedColors = () => useColorStore(state => state.setSelectedColors);
export const useClearSelectedColors = () => useColorStore(state => state.clearSelectedColors);
export const useResetToDefaultColors = () => useColorStore(state => state.resetToDefaultColors);
