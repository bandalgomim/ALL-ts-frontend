import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MainHeader from './headers/MainHeader';
import Contents from './contents/contents';
import Mode from './mode/mode';
import { TeamListBar } from '../main/teamListBar';
import { ApiContext } from '../../context/context';

export default function MainCalendar() {
  const { width, height } = Dimensions.get('window');
  const {main} = useContext(ApiContext);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' |'w'>('m')
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  // Handlers for changing the month
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
    <>
    <View style={[styles.CalendarContainer, {width: width, height: height*0.44, marginTop: -width*0.02, }]}>
      {/* Header */}
      <MainHeader
        year={year}
        month={month}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
      <Mode
        mode={mode}
        setMode={setMode}
        type={'white'}
      />
      {/* DayOfWeek + CalendarGrid */}
      <Contents
        month={month}
        year={year}
        today={currentDate}
        color={'white'}
        mode={mode}
        matchList={main.data.matchList}
      />
    </View>
    <TeamListBar
      mode={mode}
      teamList={main.data.teamList}
    />
    </>
  );
}

const styles = StyleSheet.create({
  CalendarContainer: {
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
});
