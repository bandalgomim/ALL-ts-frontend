import React, { useCallback, useContext, useMemo, useState } from 'react';
import { View, StyleSheet, Image, Text, PanResponder } from 'react-native';
import Contents from './contents/contents';
import Mode from './mode/mode';
import Header from './headers/Header';
import { width, height } from '../../global';
import { goToPrevious, goToNext, getMonthDates, getWeekDates } from './utills';
import { TeamContext } from '../../context/team.context';
import { matchDto } from '../../model/main.dto';
import MatchList from '../matchBar/matchList';
import Logo from '../logo';


export default function TeamCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' | 'w'>('m');
  const { teamRes } = useContext(TeamContext);
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Handlers for changing the month
  const handlePrevious = useCallback(() => {
    const newDate = goToPrevious(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]);

  const handleNext = useCallback(() => {
    const newDate = goToNext(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]);

  const monthDates = useMemo(() => getMonthDates(currentDate.getMonth(), currentDate.getFullYear()), [currentDate]);
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  const splitMatchList = useMemo(() => {
    const weekResult: { [key: string]: matchDto[] } = {};
    const monthResult: { [key: string]: matchDto[] } = {};
    weekDates.forEach((date) => {
      const key = (date instanceof Date ? date : new Date(date)).toLocaleDateString('sv-SE');
      if (teamRes.data.matchList[key]) {
        weekResult[key] = teamRes.data.matchList[key];
      }
    });
    monthDates.forEach((date) => {
      const key = date.toLocaleDateString('sv-SE');
      if (teamRes.data.matchList[key]) {
        monthResult[key] = teamRes.data.matchList[key];
      }
    });
    return { week: weekResult, month: monthResult };
  }, [weekDates, monthDates, teamRes.data.matchList]);
  
  // 스와이프 기능 추가
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > 40) {
            handlePrevious();
          } else if (gestureState.dx < -40) {
            handleNext();
          }
        },
      }),
    [handlePrevious, handleNext]
  );

  return (
    <View 
      style={[styles.CalendarContainer, { width: width, height: mode === 'm' ? width * 0.94 : width * 0.52 }]}
      {...panResponder.panHandlers} // 스와이프 핸들러 추가
    >
      <Image
        resizeMode="contain"
        style={[
          styles.teamBackground,
          { width: width * 1, height: width * 0.926, opacity: mode === 'm' ? 1 : 0, position: 'absolute' }
        ]}
        source={require('./../../assets/calendar/teamBackground-test.png')}
      />
      <Image
        resizeMode="contain"
        style={[
          styles.teamBackground,
          { width: width * 1, height: width * 0.4999, opacity: mode === 'w' ? 1 : 0, position: 'absolute' }
        ]}
        source={require('./../../assets/calendar/teamBackground_s-test.png')}
      />
      <Header
        year={year}
        month={month}
        type={'team'}
        goToPrevious={handlePrevious}
        goToNext={handleNext}
      />
      <View style={[styles.teamCalendar, { top: -height * 0.015 }]}>
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
          matchList={teamRes.data.matchList}
          goToPrevious={handlePrevious}
          goToNext={handleNext}
        />
      </View>

      <View style={
        {
          marginTop: mode === 'w' ? height * 0.04 : height * 0.03,
          height: mode === 'w' ? height * 0.431 : height * 0.241}}>
        <MatchList
          matchList={mode === 'w' ? splitMatchList.week : splitMatchList.month}
          color={'blue'}
        />
      </View>
      <View style={[styles.logo, {bottom: mode=== 'w' ? -height * 0.427 : -height * 0.233}]}>
        <Logo color={'blue'}/>
        <View>
          <Text style={styles.sloganText}>All  Sports  Scheduler</Text>
        </View>
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
  logo: {
    position: 'absolute',
    zIndex: -1,
    bottom: -height * 0.427,
    left: width * 0.05,
    opacity: 0.25
  },
  sloganText: {
    width: width,
    fontSize: width * 0.0885,
    marginLeft: width * 0.025,
    marginTop: -height * 0.045,
    color: '#EA5579',
    fontFamily: 'rg-it-ver2',
  },
});
