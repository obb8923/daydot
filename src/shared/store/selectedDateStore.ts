import { create } from 'zustand';

interface SelectedDateStore {
  // 상태
  year: number | undefined;
  month: number | undefined;
  day: number | undefined;
  
  // 액션들
  setSelectedDate: (year?: number, month?: number, day?: number) => void;
  resetToToday: () => void;
}

export const useSelectedDateStore = create<SelectedDateStore>((set) => {
  const today = new Date();
  
  return {
    // 초기 상태 - 오늘 날짜로 설정
    year: undefined,
    month: today.getMonth() + 1,
    day: today.getDate(),
    
    // 선택된 날짜 설정
    setSelectedDate: (year?: number, month?: number, day?: number) => {
      set({ year, month, day });
    },
    
    // 오늘 날짜로 리셋
    resetToToday: () => {
      const today = new Date();
      set({ 
        year: today.getFullYear(), 
        month: today.getMonth() + 1, 
        day: today.getDate() 
      });
    },
  };
});

// 편의 함수들
export const useSelectedYear = () => useSelectedDateStore(state => state.year);
export const useSelectedMonth = () => useSelectedDateStore(state => state.month);
export const useSelectedDay = () => useSelectedDateStore(state => state.day);
export const useSetSelectedDate = () => useSelectedDateStore(state => state.setSelectedDate);
export const useResetToToday = () => useSelectedDateStore(state => state.resetToToday);
