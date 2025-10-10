import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Text } from '@component/Text';
import { Colors } from '@constant/Colors';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@store/themeStore';
import { THEMES } from '@constant/theme';
import { T } from '@domain/Setting/component/Modal/Themes';
import { DEVICE_WIDTH } from '@constant/layout';

export const ThemeSwitcher = ({ visible, onClose }:{visible:boolean, onClose:() => void}) => {
  const { t } = useTranslation();
  const { themeIndex, setThemeIndex } = useThemeStore();
  const insets = useSafeAreaInsets();

  const handleThemeSelect = async (index: number) => {
    await setThemeIndex(index);
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
        <View className="bg-white rounded-t-3xl p-6" style={{ paddingBottom: insets.bottom + 10 }}>
          {/* modal header */}
          <View className="flex-row justify-between items-center mb-4 ">
            <Text
              text={t('setting.selectTheme')}
              type="body1"
              style={{ color: Colors.black }}
            />
            <TouchableOpacity onPress={onClose}>
              <Text text={t('app.ok')} type="body2" style={{ color: '#007AFF' }} />
            </TouchableOpacity>
          </View>

          {/* theme list */}
          <View className="flex-row flex-wrap gap-4" style={{width: DEVICE_WIDTH - 42}}>
            {THEMES.map((theme) => (
              <T key={theme.themeIndex} themeIndex={theme.themeIndex} onPress={() => handleThemeSelect(theme.themeIndex)}/>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};