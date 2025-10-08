import { View, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { Text } from '@component/Text';
import {LiquidGlassView} from '@component/LiquidGlassView';
import { Colors } from '@/shared/constant/Colors';
import { DEVICE_HEIGHT } from '@constant/normal';
import {PADDING_HORIZONTAL} from '@constant/layout';
import { useTranslation } from 'react-i18next';

// 메모 모달 UI
export const MemoModal = ({
    date,
    visible,
    onClose,
    text,
    onChangeText,
    onSave,
  }: {
    date: {month: number, day: number} | null;
    visible: boolean;
    onClose: () => void;
    text: string;
    onChangeText: (t: string) => void;
    onSave: () => void;
  }) => {
    const { t } = useTranslation();
    
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <View className="flex-1 items-center justify-end bg-black/80 pb-4" style={{paddingHorizontal: PADDING_HORIZONTAL/2}}>
              <LiquidGlassView 
              style={{width: '100%', height: DEVICE_HEIGHT * 0.3, borderRadius: 20}}
              >
              <TextInput
                className="w-full h-auto p-4 rounded-2xl"
                placeholder={t('yearlyScreen.memoPlaceholder', { month: date?.month, day: date?.day })}
                placeholderTextColor={Colors.gray200}
                multiline
                autoFocus={true}
                maxLength={300}
                value={text}
                onChangeText={onChangeText}
                style={{ color: 'white',borderRadius: 20 }}
              />
            </LiquidGlassView>
            <View className="w-full flex-row justify-end mt-3 gap-4">
                <LiquidGlassView style={{ height: 'auto', borderRadius: 20}}>
                <TouchableOpacity onPress={onClose} className="px-4 py-2">
                  <Text text={t('app.close')} type="body3" />
                </TouchableOpacity>
                </LiquidGlassView>
                <LiquidGlassView style={{ height: 'auto', borderRadius: 20}}>
                <TouchableOpacity onPress={onSave} className="px-4 py-2">
                  <Text text={t('app.save')} type="body3" />
                </TouchableOpacity>
                </LiquidGlassView>
              </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };