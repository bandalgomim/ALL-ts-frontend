import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Contents from './contents/contents';
import Header from './headers/Header';
import Select from './mode/mode';

export default function LeagueCalendar() {
  const { width, height } = Dimensions.get('window');
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
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width*1.04 : width*0.52}]}>
        <Image
          resizeMode="contain" 
          style={[styles.leagueBackground, {width:width*1, height: mode === 'm' ? width*0.92 : width*0.495}]} 
          source={ mode === 'm' ? require('./../../assets/calendar/leagueBackground.png') : require('./../../assets/calendar/leagueBackground_s.png')} />     
        <Header
          year={year}
          month={month}
          type={"league"}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
        />
        <View style={{alignItems: 'center', top: -height*0.015}}>
          <Select
            type={'white'}
            mode={mode}
            setMode={setMode}
          />
          <Contents
            month={month}
            year={year}
            today={currentDate}
            color={'white'}
            mode={mode}
          />
        </View>

    </View>
  );
}

const styles = StyleSheet.create({ 
    CalendarContainer: {
    alignItems: 'center',
  },
  leagueBackground: {
    position: 'absolute',

  }
});