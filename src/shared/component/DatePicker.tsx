import React from 'react'
import { Platform, Modal, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Text } from '@component/Text'
type DatePickerProps = {
  value: Date
  onChange: (date: Date) => void
  onConfirm?: (date: Date) => void
  onClose?: () => void
  maximumDate?: Date
  minimumDate?: Date
  visible: boolean
}

export const DatePicker = ({
  value,
  onChange,
  onConfirm,
  onClose,
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
  visible
}: DatePickerProps) => {
  const handleDateChange = (event: any, selectedDate?: Date) => {
    // 안드로이드에서는 picker를 닫고, iOS에서는 모달을 유지
    if (Platform.OS === 'android') {
      if (onClose) {
        onClose()
      }
    }
    if (selectedDate) {
      onChange(selectedDate)
    }
  }

  const handleModalClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleConfirmDate = () => {
    if (onConfirm) {
      onConfirm(value)
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Date Picker for Android */}
      {visible && Platform.OS === 'android' && (
        <DateTimePicker
          value={value}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
      
      {/* Date Picker Modal for iOS */}
      {visible && Platform.OS === 'ios' && (
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleModalClose}
        >
          <View className="flex-1 justify-end bg-black/50">
            {/* modal content */}
            <View className="bg-white rounded-t-3xl p-6">
              {/* modal header buttons */}
              <View className="flex-row justify-end items-center mb-4">
                <TouchableOpacity onPress={handleConfirmDate}>
                  <Text text="확인" type="body2" style={{color:"#007AFF"}}/>
                </TouchableOpacity>
              </View>
              {/* date picker */}
              <DateTimePicker
                value={value}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  )
}
