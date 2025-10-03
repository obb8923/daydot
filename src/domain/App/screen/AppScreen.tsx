import {View, Text, ScrollView, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ICON from '@assets/svg/1.svg'
import { Background } from '@component/Background';
import { LifeExpectancy ,DEVICE_WIDTH} from '@constant/normal';
import {BottomNavigation} from '@domain/App/component/BottomNavigation';
import { BOTTOM_NAVIGATION_HEIGHT, PADDING_HORIZONTAL } from '@constant/layout';
const ICON_SIZE = 30; 
const ICONS_PER_ROW = 10;
const DOTS_PER_ROW = 14; // 일년화면 점들의 가로 열 개수
const GRID_PADDING = 10;
const ITEM_SPACING = 10;

// 화면 타입 정의
type ScreenType = 'lifetime' | 'yearly';

export const AppScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('yearly');

  // 화면 전환 핸들러
  const handleScreenChange = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  // 일생화면 컴포넌트
  const LifetimeScreen = () => {
    // 100개의 아이콘 데이터 생성
    const icons = Array.from({length: 100}, (_, index) => ({
      id: index + 1,
      name: `Icon ${index + 1}`,
    }));

    // 각 아이콘의 애니메이션 값들을 저장할 배열
    const animatedValues = useRef(
      icons.map(() => new Animated.Value(0))
    ).current;

    const [visibleIcons, setVisibleIcons] = useState<number[]>([]);

    useEffect(() => {
      // 아이콘들을 순차적으로 나타나게 하는 함수
      const animateIconsSequentially = () => {
        icons.forEach((icon, index) => {
          setTimeout(() => {
            setVisibleIcons(prev => [...prev, icon.id]);
            
            Animated.timing(animatedValues[index], {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }).start();
          }, index * 50); // 각 아이콘마다 50ms씩 지연
        });
      };

      animateIconsSequentially();
    }, []);

    const renderIconItem = (item: {id: number; name: string}, index: number) => {
      const isVisible = visibleIcons.includes(item.id);
      
      return (
        <Animated.View 
          key={item.id} 
          className="items-center mb-2.5 py-2.5 bg-white rounded-lg"
          style={[
            {
              width: (DEVICE_WIDTH - GRID_PADDING * 2 - ITEM_SPACING * (ICONS_PER_ROW - 1)) / ICONS_PER_ROW,
              opacity: animatedValues[index],
              transform: [
                {
                  scale: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <ICON width={ICON_SIZE} height={ICON_SIZE} />
        </Animated.View>
      );
    };

    return (
      <View className="w-full h-full relative">
        <Text className="text-2xl font-bold text-center mb-5 text-gray-800">일생 화면</Text>
        <ScrollView 
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={true}
        >
          <View className="flex-row flex-wrap justify-between px-0">
            {icons.map((icon, index) => renderIconItem(icon, index))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // 일년화면 컴포넌트
  const YearlyScreen = () => {
    // 365개의 점 데이터 생성 (1년 = 365일)
    const dots = Array.from({length: 365}, (_, index) => ({
      id: index + 1,
      day: index + 1,
    }));

    // 각 점의 애니메이션 값들을 저장할 배열
    const animatedValues = useRef(
      dots.map(() => new Animated.Value(0))
    ).current;

    const [visibleDots, setVisibleDots] = useState<number[]>([]);

    useEffect(() => {
      // 점들을 순차적으로 나타나게 하는 함수
      const animateDotsSequentially = () => {
        dots.forEach((dot, index) => {
          setTimeout(() => {
            setVisibleDots(prev => [...prev, dot.id]);
            
            Animated.timing(animatedValues[index], {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }, index * 10); // 각 점마다 10ms씩 지연
        });
      };

      animateDotsSequentially();
    }, []);

    const renderDotItem = (item: {id: number; day: number}, index: number) => {
      return (
        <Animated.View 
          key={item.id} 
          className="w-5 h-5 items-center justify-center bg-white"
          style={[
            {
              opacity: animatedValues[index],
              transform: [
                {
                  scale: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View className="w-3 h-3 rounded-full bg-blue-500" style={{
            shadowColor: '#007AFF',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
          }} />
        </Animated.View>
      );
    };

    return (
      <View className="w-full h-full relative">
        <Text className="text-2xl font-bold text-center mb-5 text-gray-800">일년 화면</Text>
        <Text className="text-base text-center mt-2.5 text-gray-600">365일의 점들</Text>
        <ScrollView 
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={true}
        >
          <View className="flex-row flex-wrap justify-center gap-2.5">
            {dots.map((dot, index) => renderDotItem(dot, index))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <Background style={{width: '100%', height: '100%', paddingHorizontal:PADDING_HORIZONTAL}}>
      {/* 현재 화면에 따라 다른 컴포넌트 렌더링 */}
      {currentScreen === 'lifetime' ? <LifetimeScreen /> : <YearlyScreen />}
      
      <View className="absolute bottom-0 h-20 self-center" style={{width: DEVICE_WIDTH-PADDING_HORIZONTAL}}>
        <BottomNavigation onScreenChange={handleScreenChange} currentScreen={currentScreen} />
      </View>
    </Background>
  );
};


