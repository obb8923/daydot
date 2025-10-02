import {View, Text, StyleSheet, Dimensions, ScrollView, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ICON from '@assets/svg/1.svg'

const {width: screenWidth} = Dimensions.get('window');
const ICON_SIZE = 30; 
const ICONS_PER_ROW = 10;
const GRID_PADDING = 20;
const ITEM_SPACING = 10;

export const AppScreen = () => {
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
        <Text style={styles.iconText}>{item.name}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>100개 아이콘 그리드</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: GRID_PADDING,
  },
  iconItem: {
    width: (screenWidth - GRID_PADDING * 2 - ITEM_SPACING * (ICONS_PER_ROW - 1)) / ICONS_PER_ROW,
    alignItems: 'center',
    marginBottom: ITEM_SPACING,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconText: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
    color: '#666',
  },
});

