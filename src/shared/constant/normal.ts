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
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.jeong.daydot&hl=ko';
export const APP_STORE_URL = 'https://apps.apple.com/kr/app/daydot/id6753617820';
export const GOOGLE_FORM_URL_KO = 'https://forms.gle/kY4FdN4N3GJPrXCp7';
export const GOOGLE_FORM_URL_EN = 'https://forms.gle/kxaKCRLPFVYS8ZVb9';

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

// birthDate를 기반으로 연도 배열 생성하는 함수
export const generateYearsFromBirthDate = (birthDate: Date | null) => {
  if (!birthDate) return [];
  const birthYear = birthDate.getFullYear();
  return Array.from({length: LIFE_EXPECTANCY}, (_, index) => ({
    id: birthYear + index,
    year: birthYear + index,
    key: `${birthYear + index}`,
  }));
};

export type ScreenType = 'yearly' | 'lifetime';

export const privacyPolicy = `
시행일: 2024년 12월 17일

daydot ("본 앱")은 귀하의 개인 정보 보호를 존중하며 귀하의 개인 데이터 보호에 최선을 다하고 있습니다. 본 개인정보 처리방침은 귀하가 본 앱을 사용할 때 당사가 귀하의 정보를 수집, 사용 및 보호하는 방법을 설명합니다.

1. 당사가 수집하는 정보
본 앱은 온보딩 과정에서 사용자의 생년월일을 입력받아 저장합니다. 이 정보는 **개인 데이터(Personal Data)**로 분류되며, 오직 사용자의 기기에만 저장되고 앱 기능 구현을 위해서만 사용됩니다.

본 앱은 이 외에, 개인 식별 정보 및 비개인 데이터를 자동으로 수집하지 않습니다.

2. 수집된 정보의 사용 목적
당사가 수집하는 생년월일 데이터는 오직 앱 기능 구현을 위해서만 사용됩니다. (예: D-day 계산, 연도별 기념일 표시 등)

3. 데이터 공유 및 공개
당사는 사용자 데이터를 판매, 거래 또는 임대하지 않습니다. 당사가 수집하는 생년월일은 기기에만 저장되므로, 제3자와 공유되거나 외부에 공개되지 않습니다.

다만, 다음과 같은 경우에 한하여 데이터를 공개할 수 있습니다.

법적 요구사항: 법률에 의해 요구되는 경우, 당사는 법적 의무를 준수하기 위해 데이터를 공개할 수 있습니다.

4. 제3자 링크 및 서비스
본 앱은 외부 서비스에 대한 링크를 포함할 수 있습니다. 당사는 제3자 웹사이트 또는 서비스의 개인정보 보호 관행에 대해 책임이 없음을 유의하시기 바랍니다.

5. 데이터 보안
당사는 데이터가 사용자 기기에만 저장되도록 하며, 무단 접근, 변경 또는 공개로부터 데이터를 보호하기 위해 적절한 보안 조치를 취합니다. 그러나 어떠한 디지털 플랫폼도 절대적인 보안을 보장할 수는 없습니다.

6. 아동의 개인정보 보호
본 앱은 만 13세 미만 아동을 대상으로 하지 않습니다. 당사는 아동으로부터 의도적으로 개인 데이터를 수집하지 않습니다.

7. 귀하의 선택 및 권리
귀하의 생년월일은 기기에만 저장되므로, 기기에서 앱을 삭제하는 것으로 데이터 삭제가 완료됩니다. 귀하는 저장된 데이터에 대한 접근 및 삭제를 요청할 수 있으며, 이 경우 아래 연락처로 문의하시기 바랍니다.

8. 본 개인정보 처리방침의 변경
당사는 본 개인정보 처리방침을 주기적으로 업데이트할 수 있습니다. 변경 사항은 본 문서 상단의 업데이트된 시행일로 반영됩니다.

9. 문의
본 개인정보 처리방침에 대해 질문이나 우려 사항이 있는 경우 다음 연락처로 문의하시기 바랍니다.

companyjeong25@gmail.com
`;

export const termsOfService = `
본 약관은 daydot(이하 “앱”)의 이용과 관련하여, 앱을 사용하는 이용자(이하 “사용자”)와
앱을 운영하는 개발자(이하 “운영자”) 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

제1조 (목적)

본 약관은 사용자가 daydot 앱을 이용함에 있어,
앱의 이용조건, 이용자의 권리 및 의무, 책임사항 등을 규정함을 목적으로 합니다.

제2조 (약관의 효력 및 변경)

본 약관은 사용자가 앱을 설치하거나 이용하는 시점부터 효력이 발생합니다.

운영자는 법령 변경이나 서비스 개선을 위해 약관을 개정할 수 있으며,
개정 시점과 주요 변경 내용은 앱 내 공지 또는 업데이트 시 고지합니다.

사용자가 개정된 약관에 동의하지 않는 경우, 앱의 이용을 중단하고 삭제할 수 있습니다.

제3조 (서비스의 제공 및 변경)

daydot은 다음과 같은 서비스를 제공합니다.

사용자의 생년월일을 기반으로 한 시간 흐름 시각화

일생 또는 날짜 기반 감성 콘텐츠 제공

운영자는 기술적 필요나 정책적 판단에 따라 서비스의 내용을 변경·중단할 수 있으며,
이에 대해 사전 고지 후 조치를 취할 수 있습니다.

제4조 (개인정보의 보호)

운영자는 개인정보 보호법 등 관련 법령을 준수하며,
사용자 개인정보의 수집 및 이용은 별도의 개인정보 처리방침에 따릅니다.

daydot은 사용자의 생년월일만을 수집하며, 이는 신원을 식별할 수 없는 형태로 처리됩니다.

제5조 (이용자의 의무)

사용자는 다음 행위를 해서는 안 됩니다.

타인의 정보를 무단으로 입력하거나 도용하는 행위

앱의 정상적인 운영을 방해하거나 오류를 유발하는 행위

앱의 소스코드, 데이터 등을 무단으로 복제·변조·배포하는 행위

법령 또는 공서양속에 반하는 행위

제6조 (지적재산권)

daydot의 서비스, 디자인, 콘텐츠 및 관련 기술에 대한 모든 권리는 운영자에게 있습니다.

사용자는 앱 내 콘텐츠를 개인적인 용도로만 이용할 수 있으며,
운영자의 사전 동의 없이 복제, 배포, 상업적 이용을 할 수 없습니다.

제7조 (책임의 한계)

daydot은 서비스 제공에 최선을 다하지만,
기술적 오류나 외부 요인으로 인한 서비스 일시 중단에 대해서는 책임을 지지 않습니다.

앱에서 제공되는 정보는 참고용이며,
사용자의 판단이나 행동 결과에 대한 책임은 전적으로 사용자에게 있습니다.

daydot은 사용자의 기기 손상, 데이터 손실, 또는 제3자 간 분쟁 등에 대해
고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.

제8조 (서비스의 종료)

운영자는 부득이한 사정(예: 개발 중단, 기술적 문제 등)으로 인해
서비스를 종료할 수 있으며, 이 경우 사전 고지를 원칙으로 합니다.

제9조 (문의사항)

앱 이용과 관련한 문의사항은 아래 이메일로 연락해주시기 바랍니다.
📧 이메일: companyjeong25@gmail.com

제10조 (준거법 및 분쟁 해결)

본 약관은 대한민국 법률에 따라 해석되며,
앱 이용과 관련하여 발생한 분쟁은 운영자 소재지 관할 법원을 제1심 관할 법원으로 합니다.

부칙

본 약관은 2025년 10월 07일부터 시행합니다.`;