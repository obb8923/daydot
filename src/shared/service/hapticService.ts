import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// 햅틱 피드백 옵션
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export class HapticService {
  // 가벼운 햅틱 피드백 (선택, 탭 등)
  static light() {
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
  }
  // 중간 강도의 햅틱 피드백 
  static medium() {
    ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
  }
  // 강한 햅틱 피드백 
  static heavy() {
    ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
  }
// 소프트 햅틱 피드백
static soft() {
  ReactNativeHapticFeedback.trigger('soft', hapticOptions);
}
// 강한 햅틱 피드백
static rigid() {
  ReactNativeHapticFeedback.trigger('rigid', hapticOptions);
}
  /**
   * 성공 피드백
   */
  static success() {
    ReactNativeHapticFeedback.trigger('notificationSuccess', hapticOptions);
  }

  /**
   * 경고 피드백
   */
  static warning() {
    ReactNativeHapticFeedback.trigger('notificationWarning', hapticOptions);
  }

  /**
   * 에러 피드백
   */
  static error() {
    ReactNativeHapticFeedback.trigger('notificationError', hapticOptions);
  }
}
