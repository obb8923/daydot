import { NativeModules, Platform } from 'react-native';

interface WidgetDataManagerType {
  updateWidgetData: (
    yearProgress: number,
    daysLeft: number,
    themeIndex: number
  ) => Promise<void>;
}

const WidgetDataManager = NativeModules.WidgetDataManager as WidgetDataManagerType | undefined;

interface WidgetData {
  yearProgress: number;
  daysLeft: number;
  themeIndex: number;
}

export class WidgetService {
  /**
   * 위젯 데이터 업데이트
   * @param yearProgress 올해 진행률 (0-100)
   * @param daysLeft 올해 남은 일수
   * @param themeIndex 테마 인덱스
   */
  static async updateWidget(data: WidgetData): Promise<void> {
    if (Platform.OS !== 'ios') {
      return;
    }

    if (!WidgetDataManager) {
      console.warn('⚠️ WidgetDataManager is not available');
      return;
    }

    try {
      await WidgetDataManager.updateWidgetData(
        data.yearProgress,
        data.daysLeft,
        data.themeIndex
      );
      console.log('✅ Widget updated:', data);
    } catch (error) {
      console.error('❌ Failed to update widget:', error);
    }
  }

  /**
   * 현재 날짜 기준으로 일년 진행률 계산
   */
  static calculateYearProgress(): { yearProgress: number; daysLeft: number } {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31);
    
    const totalDays = Math.ceil(
      (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysPassed = Math.floor(
      (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysLeft = Math.ceil(
      (endOfYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const yearProgress = (daysPassed / totalDays) * 100;

    return {
      yearProgress: Math.round(yearProgress * 10) / 10, // 소수점 첫째자리까지
      daysLeft: Math.max(0, daysLeft),
    };
  }

  /**
   * 위젯 데이터를 자동으로 계산하고 업데이트
   */
  static async updateWidgetWithCurrentData(themeIndex: number): Promise<void> {
    const { yearProgress, daysLeft } = this.calculateYearProgress();
    
    await this.updateWidget({
      yearProgress,
      daysLeft,
      themeIndex,
    });
  }
}

