import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MainHeader from './headers/MainHeader';
import Contents from './contents/contents';
import Mode from './mode/mode';
import TeamAndLeagueListBar from '../main/teamAndLeagueListBar';
import { goToPrevious, goToNext } from './utills';
import { width, height } from '../../global';
import { getmainResDto } from '../../model/main.dto';
import MatchList from '../matchBar/matchList';

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
          type={'white'}
        />
        <Contents
          month={currentDate.getMonth()}
          year={currentDate.getFullYear()}
          indicatorDay={currentDate}
          color={'white'}
          mode={mode}
          matchList={data.matchList ? data.matchList : null}
          goToPrevious={handlePrevious}
          goToNext={handleNext}
        />
        {mode === 'w' ?
          <View style={styles.matchListContainer}>
            <MatchList
              matchList={data.matchList}
              color={'white'}
            />
          </View>
          :
          <View style={[styles.banner,{width: width * 0.85, height: height * 0.06, marginTop: height * 0.04}]}>
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
    marginTop: -height * 0.02, // -height * 0.0은 0과 동일하므로 0으로 변경
  },
  matchListContainer: {
    width: width,
    height: height * 0.28,
    alignItems: 'center',
    marginTop: height * 0.02,
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