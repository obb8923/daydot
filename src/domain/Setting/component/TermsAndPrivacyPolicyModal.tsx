import React from 'react'
import { View, Modal, ScrollView } from 'react-native'
import { Text } from '@component/Text'
import { privacyPolicy, termsOfService } from '@constant/normal'
import { LiquidGlassButton } from '@component/LiquidGlassButton'
import { useColorStore } from '@store/colorStore'
import { BUTTON_HEIGHT} from '@constant/layout'
import { DEVICE_HEIGHT } from '@constant/normal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const TermsAndPrivacyPolicyModal = ({type, visible, onClose}:{type:'privacy' | 'terms', visible:boolean, onClose:() => void}) => {
  const text = type === 'privacy' ? privacyPolicy : termsOfService
  const title = type === 'privacy' ? '개인정보처리방침' : '이용약관'
  const { selectedColors } = useColorStore()
  const insets = useSafeAreaInsets()
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className='w-full h-full justify-end bg-black/50'>
        {/* modal content */}
        <View 
        className='rounded-t-3xl p-6 w-full'
        style={{
          backgroundColor: selectedColors?.background ,
          height: DEVICE_HEIGHT * 0.9, 
          paddingBottom: insets.bottom + 10,

        }}>
          <Text text={title} type='title3' style={{marginBottom: 16}} />
          <ScrollView 
          style={{marginBottom: 16}} 
          showsVerticalScrollIndicator={true}>
            <Text text={text} type='body1' />
          </ScrollView>
          <LiquidGlassButton onPress={onClose} style={{height: BUTTON_HEIGHT}}>
            <Text text="닫기" type='body1' style={{color: 'white'}} />
          </LiquidGlassButton>
        </View>
      </View>
    </Modal>
  )
}