import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MainHeader from './headers/MainHeader';
import Contents from './contents/contents';
import Mode from './mode/mode';
import TeamAndLeagueListBar from '../main/teamAndLeagueListBar';
import { goToPrevious, goToNext, getMonthDates, getWeekDates } from './utills';
import { width, height } from '../../global';
import { getmainResDto, matchDto, matchListDto } from '../../model/main.dto';
import MatchList from '../matchBar/matchList';
import { startOfDay } from 'date-fns';

interface MainCalendarProps {
  data: getmainResDto;
}

const MainCalendar: React.FC<MainCalendarProps> = ({ data }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' | 'w'>('w');

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
    const result: { [key: string]: matchDto[] } = {};
    weekDates.forEach((date) => {
      const key = date.toLocaleDateString('sv-SE');
      if (data.matchList[key]) {
        result[key] = data.matchList[key];
      }
    });
    return result;
  }, [weekDates, data.matchList]);

  return (
    <View>
      <View style={styles.CalendarContainer}>
        <MainHeader
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
        />
        <Mode
          mode={mode}
          setMode={setMode}
          type={'league'}
        />
        <Contents
          monthDates = {monthDates}
          weekDates= {weekDates}
          month={currentDate.getMonth()}
          color={'white'}
          mode={mode}
          matchList={data.matchList ? data.matchList : null}
          goToPrevious={handlePrevious}
          goToNext={handleNext}
        />
        {mode === 'w' ?
          <View style={styles.matchListContainer}>
            {<MatchList
              matchList={splitMatchList}
              color={'white'}
            />}
          </View>
          :
          <View style={[styles.banner,{width: width * 0.85, height: height * 0.06, marginTop: height * 0.02}]}>
            <Text style={[styles.bannerText,{fontSize: width * 0.07}]}>advertisement banner</Text>
          </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CalendarContainer: {
    alignItems: 'center',
    width: width,
    height: height * 0.44,
    marginTop: -height * 0.03, // -height * 0.0은 0과 동일하므로 0으로 변경
  },
  matchListContainer: {
    width: width,
    height: height * 0.27,
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  banner: {
    backgroundColor: '#b1b4cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
});

export default React.memo(MainCalendar);