import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/zi18n';

type LanguageStore = {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  loadLanguage: () => Promise<void>;
};

const LANGUAGE_STORAGE_KEY = 'app_language';

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: i18n.language,
  
  setLanguage: async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      set({ language: lang });
    } catch (error) {
      console.error('언어 변경 중 오류:', error);
    }
  },

  loadLanguage: async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        await i18n.changeLanguage(savedLanguage);
        set({ language: savedLanguage });
      }
    } catch (error) {
      console.error('언어 불러오기 중 오류:', error);
    }
  },
}));

