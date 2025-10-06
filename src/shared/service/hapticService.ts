import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// 햅틱 피드백 옵션 설정
const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
};
// enableVibrateFallback 
// iOS만 해당. 햅틱 피드백을 사용할 수 없는 경우(iOS < 10 또는 기기 < iPhone6s), 
// 기본 진동 방식(강하게 1초)으로 진동합니다(기본값: false).
// ignoreAndroidSystemSettings	
// Android만 해당, 시스템 설정에서 햅틱 기능이 비활성화된 경우, 설정을 무시하고 햅틱 피드백을 트리거할 수 있습니다. (기본값: false)
export class HapticService {
  /**
   * 가벼운 햅틱 피드백
   * 용도: Dot 탭, 버튼 클릭, 가벼운 상호작용
   */
  static light() {
    ReactNativeHapticFeedback.trigger('impactLight', options);
  }

  /**
   * 중간 햅틱 피드백
   * 용도: 중요한 액션, 메뉴 선택, 중간 정도의 피드백이 필요한 상황
   */
  static medium() {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
  }

  /**
   * 강한 햅틱 피드백
   * 용도: 중요한 알림, 강한 피드백이 필요한 상황
   */
  static heavy() {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
  }

  /**
   * 딱딱한 햅틱 피드백
   * 용도: 강한 충격감이 필요한 상황, 에러나 경고 상황
   */
  static rigid() {
    ReactNativeHapticFeedback.trigger('rigid', options);
  }

  /**
   * 부드러운 햅틱 피드백
   * 용도: 부드러운 피드백이 필요한 상황, 성공적인 액션
   */
  static soft() {
    ReactNativeHapticFeedback.trigger('soft', options);
  }

  /**
   * 성공 햅틱 피드백
   * 용도: 메모 저장, 작업 완료, 성공적인 액션
   */
  static success() {
    ReactNativeHapticFeedback.trigger('notificationSuccess', options);
  }

  /**
   * 경고 햅틱 피드백
   * 용도: 경고 상황, 주의가 필요한 상황
   */
  static warning() {
    ReactNativeHapticFeedback.trigger('notificationWarning', options);
  }

  /**
   * 에러 햅틱 피드백
   * 용도: 에러 상황, 실패한 액션
   */
  static error() {
    ReactNativeHapticFeedback.trigger('notificationError', options);
  }
}
