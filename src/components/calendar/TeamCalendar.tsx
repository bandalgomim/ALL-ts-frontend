import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Image, PanResponder, Animated } from 'react-native';
import Contents from './contents/contents';
import Mode from './mode/mode';
import Header from './headers/Header';
import { width, height } from '../../global';
import { goToPrevious, goToNext, getMonthDates, getWeekDates } from './utills';
import { TeamContext } from '../../context/team.context';
import { matchDto } from '../../model/main.dto';
import MatchList from '../matchBar/matchList';

export default function TeamCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' | 'w'>('w');
  const [zIndex, setZIndex] = useState<boolean>(true); // z-index 상태 추가
  const { teamRes } = useContext(TeamContext);
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const animatedHeight = useRef(new Animated.Value(1)).current; // 1: 펼침, 0: 접힘

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
  console.log('splitMatchList', splitMatchList);
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

  // MatchList 스크롤 이벤트 핸들러
  const handleMatchListScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y === 0) {
      setZIndex(true); // 스크롤이 맨 위에 있을 때 z-index를 true로 설정
    } else if (y !== 0 && zIndex !== false){
      setZIndex(false); // 스크롤이 내려가면 z-index를 false로 설정
    }
    animatedHeight.setValue(Math.max(0, Math.min(1, 1 - y / 300)));
  };

  // calendarView의 높이/스케일 등 애니메이션 스타일
  const calendarAnimatedStyle = {
    height: animatedHeight.interpolate({
      inputRange: [0, 1],
      outputRange: mode === 'm' ? [height * 0.035, height * 0.05] : [height * 0.035, height * 0.01], // 접힘/펼침 높이(px) 원하는 값으로 조정
      extrapolate: 'clamp',
    }),
    opacity: animatedHeight.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.3, 1], // 완전히 사라지지 않게
      extrapolate: 'clamp',
    }),
    // transform 등 추가 가능
  };

  return (
    <View
      style={[
        styles.CalendarContainer,
        { width: width, height: mode === 'm' ? width * 0.94 : width * 0.52 }
      ]}
      {...panResponder.panHandlers}
    >
      <Animated.View style={[styles.calendarView, calendarAnimatedStyle, {zIndex: zIndex ? 2 : 1}]}>
        <Image
          resizeMode="contain"
          style={[
            styles.teamBackground,
            mode === 'm'
              ? styles.teamBackgroundMonth
              : { opacity: 0 }
          ]}
          source={require('./../../assets/calendar/teamBackground-test.png')}
        />
        <Image
          resizeMode="contain"
          style={[
            styles.teamBackground,
            mode === 'w'
              ? styles.teamBackgroundWeek
              : { opacity: 0 }
          ]}
          source={require('./../../assets/calendar/teamBackground_s-test.png')}
        />
        <View style={{marginTop: height * 0.005}}>
          <Header
            year={year}
            month={month}
            type={'team'}
            goToPrevious={handlePrevious}
            goToNext={handleNext}
          />
          <View style={styles.teamCalendar}>
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
        </View>
      </Animated.View>
      <View style={[mode === 'w' ? styles.matchListWeek : styles.matchListMonth, { zIndex: zIndex ? 1 : 2 }]}>
        <MatchList
          matchList={mode === 'w' ? splitMatchList.week : splitMatchList.month}
          color={'blue'}
          onScroll={handleMatchListScroll}
          scrollEventThrottle={16}
          headerHeight={mode === 'w' ? 0.2 : 0.35} // 헤더 높이 설정
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
  teamBackgroundMonth: {
    width: width * 1,
    height: width * 0.926,
    opacity: 1,
    position: 'absolute',
  },
  teamBackgroundWeek: {
    width: width * 1,
    height: width * 0.4999,
    opacity: 1,
    position: 'absolute',
  },
  teamCalendar: {
    alignItems: 'center',
    top: -height * 0.015,
  },
  logo: {
    position: 'absolute',
    zIndex: -1,
    left: width * 0.05,
    opacity: 0.25,
  },
  logoMonth: {
    bottom: -height * 0.233,
  },
  logoWeek: {
    bottom: -height * 0.427,
  },
  sloganText: {
    width: width,
    fontSize: width * 0.0885,
    marginLeft: width * 0.025,
    marginTop: -height * 0.045,
    color: '#EA5579',
    fontFamily: 'rg-it-ver2',
  },
  matchListMonth: {
    marginTop: height * 0.03,
    height: height * 0.6,

  },
  matchListWeek: {
    marginTop: height * 0.04,
    height: height * 0.6,

  },
  calendarView: {}
});
