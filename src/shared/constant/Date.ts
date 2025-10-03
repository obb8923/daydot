export const currentYear = new Date().getFullYear();
export const today = new Date();
export const todayMonth = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
export const todayDay = today.getDate();

  // 윤년 계산 함수
export const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// 이번 년도 남은 일수 계산
export const getDaysLeftInYear = () => {
  const endOfYear = new Date(currentYear, 11, 31); // 12월 31일
  const timeDiff = endOfYear.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};

// 각 월의 일수 배열
export const daysInMonth = [31, isLeapYear(currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
