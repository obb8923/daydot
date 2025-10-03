import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';
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
          style={[
            styles.iconItem,
            {
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
      <View style={{width: '100%', height: '100%', position:'relative'}}>
        <Text style={styles.title}>일생 화면</Text>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.grid}>
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
          style={[
            styles.dotItem,
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
          <View style={styles.dot} />
        </Animated.View>
      );
    };

    return (
      <View style={{width: '100%', height: '100%', position:'relative'}}>
        <Text style={styles.title}>일년 화면</Text>
        <Text style={styles.subtitle}>365일의 점들</Text>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.dotsGrid}>
            {dots.map((dot, index) => renderDotItem(dot, index))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <Background style={{width: '100%', height: '100%',paddingHorizontal:PADDING_HORIZONTAL}}>
      {/* 현재 화면에 따라 다른 컴포넌트 렌더링 */}
      {currentScreen === 'lifetime' ? <LifetimeScreen /> : <YearlyScreen />}
      
      <View style={{position:'absolute',bottom:0,width: DEVICE_WIDTH-PADDING_HORIZONTAL, height: BOTTOM_NAVIGATION_HEIGHT,alignSelf:'center'}}>
        <BottomNavigation onScreenChange={handleScreenChange} currentScreen={currentScreen} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  dotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: ITEM_SPACING,
  },
  dotItem: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  iconItem: {
    width: (DEVICE_WIDTH - GRID_PADDING * 2 - ITEM_SPACING * (ICONS_PER_ROW - 1)) / ICONS_PER_ROW,
    alignItems: 'center',
    marginBottom: ITEM_SPACING,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

