import { Dimensions } from "react-native";

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


export const LifeExpectancy = 80;

export const DATE_MESSAGE_DURATION = 2000; // 날짜 메시지 지속 시간 (밀리초) (5초)