import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Contents from './contents/contents';
import Mode from './mode/mode';
import Header from './headers/Header';
import { width, height } from '../../global';
import { goToPrevious, goToNext } from './utills';
import { TeamContext } from '../../context/team.context';

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
  }, [currentDate, mode]); // 의존성 배열에 currentDate, month, mode 추가

  const handleNext = useCallback(() => {
    const newDate = goToNext(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]); // 의존성 배열에 currentDate, month, mode 추가

  return (
    <View style={[styles.CalendarContainer, { width: width, height: mode === 'm' ? width * 0.94 : width * 0.52 }]}>
      {/* 두 이미지를 모두 렌더링하고, opacity로 전환 */}
      <Image
        resizeMode="contain"
        style={[
          styles.teamBackground,
          { width: width * 1, height: width * 0.92, opacity: mode === 'm' ? 1 : 0, position: 'absolute' }
        ]}
        source={require('./../../assets/calendar/teamBackground.png')}
      />
      <Image
        resizeMode="contain"
        style={[
          styles.teamBackground,
          { width: width * 1, height: width * 0.495, opacity: mode === 'w' ? 1 : 0, position: 'absolute' }
        ]}
        source={require('./../../assets/calendar/teamBackground_s.png')}
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
          goToPrevious={handlePrevious}
          goToNext={handleNext}
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
