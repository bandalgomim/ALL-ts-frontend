import React, { useCallback, useContext, useMemo, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Contents from './contents/contents';
import Header from './headers/Header';
import Mode from './mode/mode';
import { goToPrevious, goToNext, getMonthDates, getWeekDates } from './utills';
import { width, height } from '../../global';
import { LeagueContext } from '../../context/league.context';
import { matchDto } from '../../model/main.dto';
import MatchList from '../matchBar/matchList';
import Logo from '../logo';

export default function LeagueCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' | 'w'>('w');
  const { leagueRes } = useContext(LeagueContext);

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
    weekDates.forEach((date) => {
      const key = date.toLocaleDateString('sv-SE');
      if (leagueRes.data.matchList[key]) {
        weekResult[key] = leagueRes.data.matchList[key];
      }
    });
    return weekResult;
  }, [weekDates, leagueRes.data.matchList]);

  return (
    <View
      style={[
        styles.CalendarContainer,
        mode === 'm'
          ? styles.calendarMonth
          : styles.calendarWeek,
      ]}
    >
      {/* 두 이미지를 모두 렌더링하고, opacity로 전환 */}
      <Image
        resizeMode="contain"
        style={[
          styles.leagueBackground,
          styles.leagueBackgroundMonth,
          { opacity: mode === 'm' ? 1 : 0 }
        ]}
        source={require('./../../assets/calendar/leagueBackground.png')}
      />
      <Image
        resizeMode="contain"
        style={[
          styles.leagueBackground,
          styles.leagueBackgroundWeek,
          { opacity: mode === 'w' ? 1 : 0 }
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
      <View style={[styles.leagueCalendar, styles.leagueCalendarTop]}>
        <Mode
          type={'league'}
          mode={mode}
          setMode={setMode}
        />
        <Contents
          monthDates={monthDates}
          weekDates={weekDates}
          month={currentDate.getMonth()}
          color={'white'}
          mode={mode}
          matchList={leagueRes.data.matchList}
          goToPrevious={handlePrevious}
          goToNext={handleNext}
        />
      </View>
      <View style={styles.matchListContainer}>
        <MatchList
          matchList={mode === 'w' ? splitMatchList : {}}
          color={'blue'}
        />
      </View>
        <View style={[styles.logo, {bottom: mode === 'w'? -height * 0.3013 : -height * 0.107}, {opacity: mode === 'w' ? 0.2 : 1}]}>
          <Logo color={'blue'} />
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
  calendarMonth: {
    width: width,
    height: width * 0.94,
  },
  calendarWeek: {
    width: width,
    height: width * 0.52,
  },
  leagueBackground: {
    position: 'absolute',
  },
  leagueBackgroundMonth: {
    width: width * 1,
    height: width * 0.92,
  },
  leagueBackgroundWeek: {
    width: width * 1,
    height: width * 0.495,
  },
  leagueCalendar: {
    alignItems: 'center',
  },
  leagueCalendarTop: {
    top: -height * 0.015,
  },
  matchListContainer: {
    marginTop: height * 0.03,
    height: height * 0.31,
  },
  logo: {
    position: 'absolute',
    zIndex: -1,
    left: width * 0.05,
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
