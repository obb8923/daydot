import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingScreen } from "@domain/Setting/screen/SettingScreen";
import { WebviewScreen } from "@domain/Setting/screen/WebviewScreen";

const Stack = createNativeStackNavigator<SettingStackParamList>();

export type SettingStackParamList = {
 Setting: undefined,
 Webview: undefined,

};

export const SettingStack = () => {
    return (
        <Stack.Navigator 
        screenOptions={{headerShown:false}}
        initialRouteName="Setting">
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="Webview" component={WebviewScreen} />
        </Stack.Navigator>  
    )
}
