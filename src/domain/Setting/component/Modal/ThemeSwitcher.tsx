import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Text } from '@component/Text';
import { Colors } from '@constant/Colors';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/shared/store/themeStore';

type ThemeSwitcherProps = {
  visible: boolean;
  onClose: () => void;
};

const THEMES = [
  { id: '0', themeName: '0', primary: Colors.p0, background: Colors.b0, text: Colors.t0 },
  { id: '1', themeName: '1', primary: Colors.p1, background: Colors.b1, text: Colors.t1 },
  { id: '2', themeName: '2', primary: Colors.p2, background: Colors.b2, text: Colors.t2 },
  { id: '3', themeName: '3', primary: Colors.p3, background: Colors.b3, text: Colors.t3 },
  { id: '4', themeName: '4', primary: Colors.p4, background: Colors.b4, text: Colors.t4 },
  { id: '5', themeName: '5', primary: Colors.p5, background: Colors.b5, text: Colors.t5 },
  { id: '6', themeName: '6', primary: Colors.p6, background: Colors.b6, text: Colors.t6 },
  { id: '7', themeName: '7', primary: Colors.p7, background: Colors.b7, text: Colors.t7 },
  { id: '8', themeName: '8', primary: Colors.p8, background: Colors.b8, text: Colors.t8 },
];

export const ThemeSwitcher = ({ visible, onClose }: ThemeSwitcherProps) => {
  const { t } = useTranslation();
  const { selectedTheme, setSelectedTheme } = useThemeStore();
  const insets = useSafeAreaInsets();

  const handleThemeSelect = async (theme: typeof THEMES[0]) => {
    await setSelectedTheme({
      themeName: theme.themeName,
      primary: theme.primary,
      background: theme.background,
      text: theme.text,
    });
    onClose();
  };

  const isSelectedTheme = (theme: typeof THEMES[0]) => {
    return selectedTheme?.themeName === theme.themeName;
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
          <View className="flex-row justify-between items-center mb-4">
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
          <View>
            {THEMES.map((theme, index) => (
              <TouchableOpacity
                key={theme.id}
                onPress={() => handleThemeSelect(theme)}
                className="flex-row justify-between items-center py-4"
                style={{
                  backgroundColor: isSelectedTheme(theme) ? '#EFEFF0' : 'transparent',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  marginBottom: index === THEMES.length - 1 ? 0 : 8,
                }}
              >
                <View className="flex-row items-center gap-3">
                  {/* 테마 색상 미리보기 */}
                  <View className="flex-row gap-1">
                    <View style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: theme.primary }} />
                    <View style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: theme.background }} />
                  </View>
                  <Text
                    text={t(`theme.${theme.id}`)}
                    type="body1"
                    style={{ color: Colors.black }}
                  />
                </View>
                {isSelectedTheme(theme) && (
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