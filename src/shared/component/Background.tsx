import { View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type BackgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  isStatusBarGap?: boolean;
  isBottomGap?: boolean;
}

export const Background = ({children,isStatusBarGap=true,isBottomGap=true,...props}: BackgroundProps) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="flex-1 bg-background"
      style={{
        paddingTop: isStatusBarGap ? insets.top : 0,
        paddingBottom: (isBottomGap ? insets.bottom : 0),
        ...props.style
      }}>
      <View style={{flex:1}}>
        {children}
      </View>
    </View>    
  )
}
