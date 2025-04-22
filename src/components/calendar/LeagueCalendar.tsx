import React, { useCallback, useContext, useMemo, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Contents from './contents/contents';
import Header from './headers/Header';
import Mode from './mode/mode';
import { goToPrevious, goToNext, getMonthDates, getWeekDates } from './utills';
import { width, height } from '../../global';
import { LeagueContext } from '../../context/league.context';
import { matchDto } from '../../model/main.dto';
import MatchList from '../matchBar/matchList';

export default function LeagueCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' |'w'>('w');
  const {leagueRes} = useContext(LeagueContext);

  // Handlers for changing the month
  const handlePrevious = useCallback(() => {
    const newDate = goToPrevious(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]); // 의존성 배열에 currentDate, month, mode 추가

  const handleNext = useCallback(() => {
    const newDate = goToNext(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]); // 의존성 배열에 currentDate, month, mode 추가

  const monthDates = useMemo(() => getMonthDates(currentDate.getMonth(), currentDate.getFullYear()), [currentDate]);
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  const splitMatchList = useMemo(() => {
    const weekResult: { [key: string]: matchDto[] } = {};
    weekDates.forEach((date) => {
      const key = date.toISOString().split('T')[0];
      if (leagueRes.data.matchList[key]) {
        weekResult[key] = leagueRes.data.matchList[key];
      }
    });
    return weekResult;
  }, [weekDates, leagueRes.data.matchList]);

  return (
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width * 0.94 : width * 0.52}]}>
      {/* 두 이미지를 모두 렌더링하고, opacity로 전환 */}
      <Image
        resizeMode="contain"
        style={[
          styles.leagueBackground,
          {width: width * 1, height: width * 0.92, opacity: mode === 'm' ? 1 : 0, position: 'absolute'}
        ]}
        source={require('./../../assets/calendar/leagueBackground.png')}
      />
      <Image
        resizeMode="contain"
        style={[
          styles.leagueBackground,
          {width: width * 1, height: width * 0.495, opacity: mode === 'w' ? 1 : 0, position: 'absolute'}
        ]}
        source={require('./../../assets/calendar/leagueBackground_s.png')}
      />
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
          monthDates = {monthDates}
          weekDates= {weekDates}
          month={currentDate.getMonth()}
          color={'white'}
          mode={mode}
          matchList={leagueRes.data.matchList}
          goToPrevious={handlePrevious}
          goToNext={handleNext}
        />
      </View>
      <View style={{marginTop: height * 0.03, height: height * 0.31}}>
        <MatchList
          matchList={mode === 'w' ? splitMatchList : {}}
          color={'blue'}
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
