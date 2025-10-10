import { Colors } from '@constant/Colors'
import {TouchableOpacity, View} from 'react-native'
import {THEMES} from '@constant/theme'
import {Text} from '@component/Text'
import {useTranslation} from 'react-i18next'
import {DEVICE_WIDTH} from '@constant/layout'
export const T=({themeIndex,onPress}:{themeIndex:number,onPress:() => void, key:any})=>{
  const {t} = useTranslation()
  return (
  <TouchableOpacity 
  className='justify-center items-center rounded-lg' 
  onPress={onPress} 
  style={{
    width: (DEVICE_WIDTH-42-16) /2, 
    height: 100,
    backgroundColor: THEMES[themeIndex].background
  }}
  >
  <View 
  className="flex-row gap-1 justify-center items-center mb-2" 
  >
    {themeIndex===0 && <T0/>}
    {themeIndex===1 && <T1/>}
    </View>
    <Text text={t(`theme.${themeIndex}`)} type='body1' />
</TouchableOpacity>
)
}
// 테마 미리보기 컴포넌트
export const T0 = () => {
    return (
      <>  
        <View 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: Colors.gray700,
              shadowColor: Colors.white,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 3,
            }}
          />
          <View 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: Colors.white,
              shadowColor: Colors.white,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 3,
            }}
          />
          <View 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: Colors.white,
              shadowColor: Colors.white,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 3,
            }}
          />
      </>
    )
  }

export const T1= () => {
    return (
      <>
        <View 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: Colors.gray700,
              shadowColor: Colors.white,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 3,
            }}
          />
          <View 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: Colors.p1,
              shadowColor: Colors.white,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 3,
            }}
          />
          <View 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: Colors.p1,
              shadowColor: Colors.white,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 3,
            }}
          />
      </>
    )
  }