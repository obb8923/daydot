import { create } from 'zustand';

interface SelectedDateStore {
  // 상태
  selectedDate: Date;
  
  // 액션들
  setSelectedDate: (date: Date) => void;
  resetToToday: () => void;
}

export const useSelectedDateStore = create<SelectedDateStore>((set) => ({
  // 초기 상태 - 오늘 날짜로 설정
  selectedDate: new Date(),
  
  
  // 선택된 날짜 설정
  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
  },
  
  // 오늘 날짜로 리셋
  resetToToday: () => {
    set({ selectedDate: new Date() });
  },
}));

// 편의 함수들
export const useSelectedDate = () => useSelectedDateStore(state => state.selectedDate);
export const useSetSelectedDate = () => useSelectedDateStore(state => state.setSelectedDate);
export const useResetToToday = () => useSelectedDateStore(state => state.resetToToday);
