import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MainHeader from './headers/MainHeader';
import Contents from './contents/contents';
import Mode from './mode/mode';
import TeamAndLeagueListBar from '../main/teamAndLeagueListBar';
import { ApiContext } from '../../context/context';
import { goToPrevious, goToNext } from './utills';

export default function MainCalendar() {
  const { width, height } = Dimensions.get('window');
  const {mainRes} = useContext(ApiContext);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' |'w'>('m');

  const handlePrevious = useCallback(() => {
    const newDate = goToPrevious(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]); // 의존성 배열에 currentDate, month, mode 추가

  const handleNext = useCallback(() => {
    const newDate = goToNext(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]); // 의존성 배열에 currentDate, month, mode 추가

  return (
    <View>
      <View style={[styles.CalendarContainer, {width: width, height: height * 0.44, marginTop: -width * 0.02 }]}>
        <MainHeader
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          goToPrevious={handlePrevious}
          goToNext={handleNext}
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
          matchList={mainRes.data.matchList}
        />
      </View>
      <TeamAndLeagueListBar
        mode={mode}
        teamAndLeagueList={mainRes.data.teamAndLeagueList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  CalendarContainer: {
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
});
