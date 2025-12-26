import { matchListDto } from "@model/main.dto";

export const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const getDaysInMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const getPreviousMonthDays = (month: number, year: number, count: number): Date[] => {
  const date = new Date(year, month, 0);
  const days: Date[] = [];
  for (let i = 0; i < count; i++) {
    days.unshift(new Date(date));
    date.setDate(date.getDate() - 1);
  }

  return days;
};

export const getNextMonthDays = (month: number, year: number, count: number): Date[] => {
  const date = new Date(year, month + 1, 1);
  const days: Date[] = [];

  for (let i = 0; i < count; i++) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const getMonthDates = (month: number, year: number)  => {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayIndex = daysInMonth[0].getDay();
  let calendarMonth: (Date | string)[] = [];
  calendarMonth = getPreviousMonthDays(month, year, firstDayIndex).concat(daysInMonth);

  if (calendarMonth.length > 35) {
    calendarMonth = calendarMonth.slice(0, 35);
  } else if (calendarMonth.length < 35) {
    calendarMonth = calendarMonth.concat(getNextMonthDays(month, year, 35 - calendarMonth.length));
  }

  return calendarMonth;
};

export const getWeekDates = (today: Date) => {
  const dayOfWeek = today.getDay(); // 오늘의 요일 (0: 일요일 ~ 6: 토요일)
  const startDate = new Date(today); // 오늘 날짜 복사
  startDate.setDate(today.getDate() - dayOfWeek); // 일요일 날짜

  const weekDates = [...Array(7)].map((_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  return weekDates;
};

export const goToPrevious = (currentDate: Date, mode: string): Date => {
  const newDate = new Date(currentDate); // currentDate 복사
  const month = currentDate.getMonth(); // 현재 월 계산
  const year = currentDate.getFullYear(); // 현재 연도 계산
  if (mode === 'm') {
    newDate.setMonth(month - 1); // 한 달 전으로 설정
  } else {
    newDate.setDate(newDate.getDate() - 7); // 7일 전으로 설정
  }

  // 새로운 달로 넘어간 경우, month 값이 증가하는 경우 자동으로 달 +1 해주기
  if (newDate.getMonth() !== month) {
    if (newDate.getMonth() === 11) { // 12월에서 1월로 넘어가는 경우
      newDate.setFullYear(year - 1); // 연도를 하나 감소
    } else {
      newDate.setMonth(month - 1);
    }
  }
  return newDate; // 계산된 새로운 날짜 반환
};

export const goToNext = (currentDate: Date, mode: string): Date => {
  const newDate = new Date(currentDate);
  const month = currentDate.getMonth(); // 현재 월 계산
  const year = currentDate.getFullYear(); // 현재 연도 계산
  if (mode === 'm') {
    newDate.setMonth(month + 1); // 한 달 후로 설정
  } else {
    newDate.setDate(newDate.getDate() + 7); // 7일 후로 설정
  }

  // 새로운 달로 넘어간 경우, month 값이 증가하는 경우 자동으로 달 +1 해주기
  if (newDate.getMonth() !== month) {
    if (newDate.getMonth() === 0) { // 1월에서 12월로 넘어가는 경우
      newDate.setFullYear(year + 1); // 연도를 하나 증가
    } else {
      newDate.setMonth(month + 1);
    }
  }
  return newDate; // 계산된 새로운 날짜 반환
};

export const findNext = (matchList: matchListDto) => {
  // 새로운 객체를 만들어 'next' 상태만 남깁니다.
  const result: matchListDto = {};
  for (const [date, matches] of Object.entries(matchList)) {
    // matchState가 'next'인 경기만 필터링
    const nextMatches = matches.filter(match => match.matchState === 'next');
    if (nextMatches.length > 0) {
      result[date] = nextMatches;
    }
  }
  return result;
};

export const findNextInLeague = (matchList: matchListDto, teamId: number) => {
  // 새로운 객체를 만들어 'next' 상태만 남깁니다.
  const result: matchListDto = {};
  for (const [date, matches] of Object.entries(matchList)) {
    // matchState가 'next'인 경기만 필터링
    const nextMatches = matches.filter(match => match.matchState === 'next' && (match.homeTeamId === teamId || match.awayTeamId === teamId));
    if (nextMatches.length > 0) {
      result[date] = nextMatches;
    }
  }
  return result;
};