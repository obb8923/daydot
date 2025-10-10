import { Colors } from "./Colors";

// 테마 타입 정의
export type ThemeType = {
    themeIndex: number;
    primary: string;
    background: string;
    text: string;
  };

export const THEMES: ThemeType[] = [
    {
        themeIndex: 0,
        primary: Colors.p0,
        background: Colors.b0,
        text: Colors.t0,
    },
    {
        themeIndex: 1,
        primary: Colors.p1,
        background: Colors.b1,
        text: Colors.t1,
    },
];