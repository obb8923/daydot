import { ViewStyle } from 'react-native';
import { LiquidGlassView } from '@component/LiquidGlassView';
import { useHaptic } from '@/shared/hooks/useHaptic';
export const LiquidGlassButton = ({children, onPress, style}: {children: React.ReactNode, onPress: () => void, style?: ViewStyle}) => {
  const { soft } = useHaptic();

  const handlePress = () => {
    soft();
    onPress();
  };

  return (
    <LiquidGlassView 
    style={{
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        ...style
        }}
        interactive={true}
        onPress={handlePress}
        >
       
        {children}
       
    </LiquidGlassView>
  );
};