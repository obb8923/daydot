import { Dimensions } from "react-native";
import { daysInMonth } from "@constant/Date";

const { width, height } = Dimensions.get('window');

// AsyncStorage 키 상수들
export const STORAGE_KEYS = {
} as const;

export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;

export const MAIL_ADDRESS = 'companyjeong25@gmail.com';


//내 앱으로 바꿔야함
// export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.companyjeong.readin&hl=ko';
// export const APP_STORE_URL = 'itms-apps://apps.apple.com/app/id6752389566';


export const LIFE_EXPECTANCY = 80;

export const DATE_MESSAGE_DURATION = 2000; // 날짜 메시지 지속 시간 (밀리초) (5초)

  // 날짜별 점 데이터 생성
  export const dots: {id: string, month: number, day: number, key: string}[] = [];

  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= daysInMonth[month - 1]; day++) {
      const key = `${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
      dots.push({
        id: key,
        month,
        day,
        key,
      });
    }
  }

    // 80개의 연도 데이터 생성 (1년부터 80년까지)
    export const years = Array.from({length: LIFE_EXPECTANCY}, (_, index) => ({
      id: index + 1,
      year: index + 1,
      key: `${index + 1}`,
    }));

export type ScreenType = 'yearly' | 'lifetime';