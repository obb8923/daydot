import { View, ViewStyle } from "react-native"
import { useThemeStore } from "@store/themeStore"
import { Colors } from "@constant/Colors"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type BackgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  isStatusBarGap?: boolean;
  isBottomGap?: boolean;
}
export const Background = ({children,isStatusBarGap=true,isBottomGap=true,...props}: BackgroundProps) => {
  const selectedTheme = useThemeStore((state) => state.selectedTheme);
  const insets = useSafeAreaInsets();
  
  // 기본 색상 설정
  const backgroundColor = selectedTheme?.background || Colors.b0;
  
  return (
    <View 
    style={{
      flex:1,
      paddingTop: isStatusBarGap ? insets.top : 0,
      paddingBottom: (isBottomGap ? insets.bottom : 0),
      backgroundColor: backgroundColor,
      ...props.style}}>
        <View style={{flex:1}}>
      {children}
      </View>
    </View>    
  )
}
