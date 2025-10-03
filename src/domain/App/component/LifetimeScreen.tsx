import {View, Text, ScrollView, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ICON from '@assets/svg/1.svg'
import { LifeExpectancy ,DEVICE_WIDTH} from '@constant/normal';

const ICON_SIZE = 30; 
const ICONS_PER_ROW = 10;
const GRID_PADDING = 10;
const ITEM_SPACING = 10;

export const LifetimeScreen = () => {
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
