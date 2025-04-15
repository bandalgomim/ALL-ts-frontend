import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Contents from './contents/contents';
import Header from './headers/Header';
import Mode from './mode/mode';
import { ApiContext } from '../../context/context';
import { goToPrevious, goToNext } from './utills';
import { width, height } from '../../global';

export default function LeagueCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' |'w'>('w');
  const {leagueRes} = useContext(ApiContext);

  // Handlers for changing the month
  const handlePrevious = useCallback(() => {
    const newDate = goToPrevious(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]); // 의존성 배열에 currentDate, month, mode 추가

  const handleNext = useCallback(() => {
    const newDate = goToNext(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]); // 의존성 배열에 currentDate, month, mode 추가

  return (
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width * 0.94 : width * 0.52}]}>
      <Image
        resizeMode="contain"
        style={[styles.leagueBackground, {width:width * 1, height: mode === 'm' ? width * 0.92 : width * 0.495}]}
        source={ mode === 'm' ? require('./../../assets/calendar/leagueBackground.png') : require('./../../assets/calendar/leagueBackground_s.png')} />
      <Header
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
        type={'league'}
        goToPrevious={handlePrevious}
        goToNext={handleNext}
      />
      <View style={[styles.leagueCalendar, {top: -height * 0.015}]}>
        <Mode
          type={'white'}
          mode={mode}
          setMode={setMode}
        />
        <Contents
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          indicatorDay={currentDate}
          color={'white'}
          mode={mode}
          matchList={leagueRes.data.matchList}
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
  },
  leagueCalendar: {
    alignItems: 'center',
  },
});
