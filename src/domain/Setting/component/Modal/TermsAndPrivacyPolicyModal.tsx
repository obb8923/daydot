import React from 'react'
import { View, Modal, ScrollView } from 'react-native'
import { Text } from '@component/Text'
import { privacyPolicy, termsOfService } from '@constant/normal'
import { LiquidGlassButton } from '@component/LiquidGlassButton'
import { useThemeStore } from '@store/themeStore'
import { BUTTON_HEIGHT} from '@constant/layout'
import { DEVICE_HEIGHT } from '@constant/normal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'

export const TermsAndPrivacyPolicyModal = ({type, visible, onClose}:{type:'privacy' | 'terms', visible:boolean, onClose:() => void}) => {
  const { t } = useTranslation()
  const text = type === 'privacy' ? privacyPolicy : termsOfService
  const title = type === 'privacy' ? t('setting.privacy') : t('setting.terms')
  const { selectedTheme } = useThemeStore()
  const insets = useSafeAreaInsets()
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className='w-full h-full justify-end bg-black/50'>
        {/* modal content */}
        <View 
        className='rounded-t-3xl p-6 w-full'
        style={{
          backgroundColor: selectedTheme?.background ,
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
            <Text text={t('app.close')} type='body1' style={{color: 'white'}} />
          </LiquidGlassButton>
        </View>
      </View>
    </Modal>
  )
}