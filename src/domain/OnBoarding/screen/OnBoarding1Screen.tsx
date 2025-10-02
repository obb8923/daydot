import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { OnboardingStackParamList } from '@nav/Onboarding';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type OnBoarding1ScreenProps = NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding1'>;
export const OnBoarding1Screen = () => {
  const navigation = useNavigation<OnBoarding1ScreenProps>();

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OnBoarding1</Text>
      <Text style={styles.description}>첫 번째 온보딩 화면입니다.</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

