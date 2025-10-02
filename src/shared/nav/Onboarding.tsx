import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnBoarding1Screen } from "@domain/OnBoarding/screen/OnBoarding1Screen";
import { OnBoarding2Screen } from "@domain/OnBoarding/screen/OnBoarding2Screen";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export type OnboardingStackParamList = {
 Onboarding1: undefined,
 Onboarding2: undefined,

};

export const OnboardingStack = () => {
    return (
        <Stack.Navigator 
        screenOptions={{headerShown:false}}
        initialRouteName="Onboarding1">
            <Stack.Screen name="Onboarding1" component={OnBoarding1Screen} />
            <Stack.Screen name="Onboarding2" component={OnBoarding2Screen} />
        </Stack.Navigator>  
    )
}
