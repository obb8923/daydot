import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import ko from './locales/ko.json';
// import jp from './locales/jp.json';

const resources = {
  en: { translation: en },
  ko: { translation: ko },
};
const { languageCode } = RNLocalize.getLocales()[0]

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: languageCode,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
