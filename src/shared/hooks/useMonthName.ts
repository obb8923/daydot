import { useTranslation } from 'react-i18next';

// Custom hook to get month name based on current language
export const useMonthName = () => {
  const { i18n } = useTranslation();
  
  const getMonthName = (month: number) => {
    if (i18n.language === 'en') {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      return monthNames[month - 1];
    }
    return month; // For Korean, keep the number
  };
  
  return getMonthName;
};