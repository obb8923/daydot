import { useCallback } from 'react';
import { HapticService } from '../service/hapticService';

// 햅틱 피드백을 사용하는 공유 훅 - 다양한 햅틱 피드백 타입을 편리하게 사용할 수 있도록 제공
export const useHaptic = () => {
  // 가벼운 햅틱 피드백 - Dot 탭, 버튼 클릭, 가벼운 상호작용
  const light = useCallback(() => {
    HapticService.light();
  }, []);

  // 중간 햅틱 피드백 - 중요한 액션, 메뉴 선택, 중간 정도의 피드백이 필요한 상황
  const medium = useCallback(() => {
    HapticService.medium();
  }, []);

  // 강한 햅틱 피드백 - 중요한 알림, 강한 피드백이 필요한 상황
  const heavy = useCallback(() => {
    HapticService.heavy();
  }, []);

  // 딱딱한 햅틱 피드백 - 강한 충격감이 필요한 상황, 에러나 경고 상황
  const rigid = useCallback(() => {
    HapticService.rigid();
  }, []);

  // 부드러운 햅틱 피드백 - 부드러운 피드백이 필요한 상황, 성공적인 액션
  const soft = useCallback(() => {
    HapticService.soft();
  }, []);

  // 성공 햅틱 피드백 - 메모 저장, 작업 완료, 성공적인 액션
  const success = useCallback(() => {
    HapticService.success();
  }, []);

  // 경고 햅틱 피드백 - 경고 상황, 주의가 필요한 상황
  const warning = useCallback(() => {
    HapticService.warning();
  }, []);

  // 에러 햅틱 피드백 - 에러 상황, 실패한 액션
  const error = useCallback(() => {
    HapticService.error();
  }, []);

  return {
    light,
    medium,
    heavy,
    rigid,
    soft,
    success,
    warning,
    error,
  };
};
