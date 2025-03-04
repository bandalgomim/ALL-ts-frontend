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
}

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