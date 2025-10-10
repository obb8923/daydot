import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Text } from '@component/Text';
import { Colors } from '@constant/Colors';
import { useLanguageStore } from '@store/languageStore';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type LanguageSwitcherProps = {
  visible: boolean;
  onClose: () => void;
};

const LANGUAGES = [
  { code: 'ko' },
  { code: 'en' },
];

export const LanguageSwitcher = ({ visible, onClose }: LanguageSwitcherProps) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const insets = useSafeAreaInsets();
  const handleLanguageSelect = async (langCode: string) => {
    await setLanguage(langCode);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        {/* modal content */}
        <View className="bg-white rounded-t-3xl p-6" style={{paddingBottom: insets.bottom + 10}}>
          {/* modal header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text
              text={t('setting.selectLanguage')}
              type="body1"
              style={{ color: Colors.black }}
            />
            <TouchableOpacity onPress={onClose}>
              <Text text={t('app.ok')} type="body2" style={{ color: '#007AFF' }} />
            </TouchableOpacity>
          </View>

          {/* language list */}
          <View>
            {LANGUAGES.map((lang, index) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => handleLanguageSelect(lang.code)}
                className="flex-row justify-between items-center py-4"
                style={{
                  backgroundColor: language === lang.code ? '#EFEFF0' : 'transparent',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  marginBottom: index === LANGUAGES.length - 1 ? 0 : 8,
                }}
              >
                <Text
                  text={t(`language.${lang.code}`)}
                  type="body1"
                  style={{ color: Colors.black }}
                />
                {language === lang.code && (
                  <View className="w-6 h-6 justify-center items-center">
                    <Text text="✓" type="body1" style={{ color: Colors.black }} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};
