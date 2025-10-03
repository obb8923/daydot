import { View, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { Text } from '@component/Text';
import {LiquidGlassView} from '@component/LiquidGlassView';
import { Colors } from '@/shared/constant/Colors';
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
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <View className="flex-1 justify-end bg-black/40 pb-4">
              <LiquidGlassView 
              style={{width: '100%', height: 'auto', borderRadius: 20}}
              >
              <TextInput
                className="w-full h-auto p-4 rounded-2xl"
                placeholder={`${date?.month}월 ${date?.day}일의 메모를 입력하세요`}
                placeholderTextColor={Colors.gray200}
                multiline
                value={text}
                onChangeText={onChangeText}
                style={{ color: 'white',borderRadius: 20 }}
              />
            </LiquidGlassView>
            <View className="flex-row justify-end mt-3 mr-4 gap-4">
                <LiquidGlassView style={{ height: 'auto', borderRadius: 20}}>
                <TouchableOpacity onPress={onClose} className="px-4 py-2">
                  <Text text="닫기" type="body3" />
                </TouchableOpacity>
                </LiquidGlassView>
                <LiquidGlassView style={{ height: 'auto', borderRadius: 20}}>
                <TouchableOpacity onPress={onSave} className="px-4 py-2">
                  <Text text="저장" type="body3" />
                </TouchableOpacity>
                </LiquidGlassView>
              </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };