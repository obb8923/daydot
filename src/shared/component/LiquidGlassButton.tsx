import { TouchableOpacity, ViewStyle } from 'react-native';
import { LiquidGlassView } from '@component/LiquidGlassView';
import { PADDING_HORIZONTAL } from '@constant/layout';

export const LiquidGlassButton = ({children, onPress, style}: {children: React.ReactNode, onPress: () => void, style?: ViewStyle}) => {
  return (
    <LiquidGlassView 
    style={{
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        ...style
        }}
        interactive={true}
        onPress={onPress}
        >
       
        {children}
       
    </LiquidGlassView>
  );
};