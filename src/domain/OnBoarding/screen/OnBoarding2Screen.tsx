import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useFirstVisitStore } from '@store/firstVisitStore'

export const OnBoarding2Screen = () => {
  const { setFirstVisitCompleted } = useFirstVisitStore();

  const handleComplete = async () => {
    await setFirstVisitCompleted();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OnBoarding2</Text>
      <Text style={styles.description}>온보딩이 완료되었습니다!</Text>
      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>시작하기</Text>
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