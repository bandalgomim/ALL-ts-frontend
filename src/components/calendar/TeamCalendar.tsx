import React, { useContext, useState } from 'react';
import { View, StyleSheet,  Image } from 'react-native';
import Contents from './contents/contents';
import Mode from './mode/mode';
import Header from './headers/Header';
import { ApiContext } from '../../context/context';
import { width, height } from '../../global';

export default function TeamCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' |'w'>('m');
  const {teamRes} = useContext(ApiContext);
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const goToPrevious = () => {
    const newDate = new Date(currentDate);  // currentDate 복사
    if (mode === 'm') {
      newDate.setMonth(month - 1);  // 한 달 전으로 설정
    } else {
      newDate.setDate(newDate.getDate() - 7);  // 7일 전으로 설정
    }
    // 새로운 달로 넘어간 경우, month 값이 증가하는 경우 자동으로 달 +1 해주기
    if (newDate.getMonth() !== month) {
      newDate.setMonth(month - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);  // currentDate 복사
    if (mode === 'm') {
      newDate.setMonth(month + 1);  // 한 달 후로 설정
    } else {
      newDate.setDate(newDate.getDate() + 7);  // 7일 후로 설정
    }
    // 새로운 달로 넘어간 경우, month 값이 증가하는 경우 자동으로 달 +1 해주기
    if (newDate.getMonth() !== month) {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width * 0.94 : width * 0.52}]}>
        <Image
          resizeMode="contain"
          style={[styles.teamBackground, {width:width * 1, height: mode === 'm' ? width * 0.92 : width * 0.495}]}
          source={ mode === 'm' ? require('./../../assets/calendar/teamBackground.png') : require('./../../assets/calendar/teamBackground_s.png')} />
        <Header
          year={year}
          month={month}
          type={'team'}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
        />
        <View style={[styles.teamCalendar, {top: -height * 0.015}]}>
          <Mode
            type={'blue'}
            mode={mode}
            setMode={setMode}
          />
          <Contents
            month={month}
            year={year}
            indicatorDay={currentDate}
            color={'blue'}
            mode={mode}
            matchList={teamRes.data.matchList}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    CalendarContainer: {
    alignItems: 'center',
  },
  teamBackground: {
    position: 'absolute',
  },
  teamCalendar: {
    alignItems: 'center',
  },
});
