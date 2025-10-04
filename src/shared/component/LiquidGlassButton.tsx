import { TouchableOpacity, ViewStyle } from 'react-native';
import { LiquidGlassView } from '@component/LiquidGlassView';
import { PADDING_HORIZONTAL } from '@constant/layout';

export const LiquidGlassButton = ({children, onPress, style}: {children: React.ReactNode, onPress: () => void, style?: ViewStyle}) => {
  return (
    <LiquidGlassView style={{
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        ...style
        }}
        interactive={true}>
        <TouchableOpacity 
        onPress={onPress}
        className="flex-row justify-center items-center"
        style={{paddingHorizontal:PADDING_HORIZONTAL,paddingVertical:PADDING_HORIZONTAL/4}}
        >
        {children}
        </TouchableOpacity>
    </LiquidGlassView>
  );
};