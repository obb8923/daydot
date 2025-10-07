import React from 'react';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Text } from '@/shared/component/Text';
import { LiquidGlassView } from '@/shared/component/LiquidGlassView';
import { LiquidGlassButton } from '@/shared/component/LiquidGlassButton';
import { Colors } from '@/shared/constant/Colors';
import { useLanguageStore } from '@/shared/store/languageStore';
import { useTranslation } from 'react-i18next';

type LanguageSwitcherProps = {
  visible: boolean;
  onClose: () => void;
};

const LANGUAGES = [
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English' },
];

export const LanguageSwitcher = ({ visible, onClose }: LanguageSwitcherProps) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageSelect = async (langCode: string) => {
    await setLanguage(langCode);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          <LiquidGlassView style={styles.content}>
            <Text
              text={t('setting.selectLanguage')}
              type="body1"
              className="text-white mb-6"
            />

            <View style={styles.languageList}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleLanguageSelect(lang.code)}
                  style={styles.languageItem}
                >
                  <Text
                    text={lang.name}
                    type="body1"
                    style={{
                      color: language === lang.code ? Colors.primary : 'white',
                    }}
                  />
                  {language === lang.code && (
                    <View style={styles.checkmark}>
                      <Text text="✓" type="body1" style={{ color: Colors.primary }} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <LiquidGlassButton
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text text={t('app.cancel')} type="body1" className="text-white" />
            </LiquidGlassButton>
          </LiquidGlassView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    maxWidth: 400,
  },
  content: {
    padding: 24,
    borderRadius: 20,
  },
  languageList: {
    marginBottom: 24,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray800,
  },
  checkmark: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

