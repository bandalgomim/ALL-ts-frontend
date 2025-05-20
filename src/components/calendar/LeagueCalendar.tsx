import React, { useCallback, useContext, useMemo, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, PanResponder, Animated } from 'react-native';
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
  const animatedHeight = useRef(new Animated.Value(1)).current; // 1: 펼침, 0: 접힘

  useEffect(() => {
    const id = animatedHeight.addListener(({ value }) => {
      // opacity 계산식과 동일하게 로그 출력
      const opacity = 0.05 + (1 - 0.05) * value; // outputRange: [0.05, 1]
      console.log('animatedHeight:', value, 'opacity:', opacity);
    });
    return () => animatedHeight.removeListener(id);
  }, [animatedHeight]);

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
      const key = date.toLocaleDateString('sv-SE');
      if (leagueRes.data.matchList[key]) {
        weekResult[key] = leagueRes.data.matchList[key];
      }
    });
    monthDates.forEach((date) => {
      const key = date.toLocaleDateString('sv-SE');
      if (leagueRes.data.matchList[key]) {
        monthResult[key] = leagueRes.data.matchList[key];
      }
    });
    return { week: weekResult, month: monthResult };
  }, [weekDates, monthDates, leagueRes.data.matchList]);

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
    animatedHeight.setValue(Math.max(0, Math.min(1, 1 - y / 300)));
  };

  // calendarView의 높이/스케일 등 애니메이션 스타일
  const calendarAnimatedStyle = {
    height: animatedHeight.interpolate({
      inputRange: [0, 1],
      outputRange: mode === 'm' ? [height * 0.02, height*0.05] : [height * 0.02, height*0.01], // 접힘/펼침 높이(px) 원하는 값으로 조정
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
        mode === 'm'
          ? styles.calendarMonth
          : styles.calendarWeek,
      ]}
      {...panResponder.panHandlers} // 스와이프 핸들러 추가
    >
      <Animated.View
        style={[
          styles.calendarView,
          calendarAnimatedStyle,
          // opacity가 0에 가까우면 아예 렌더링하지 않음
          animatedHeight.__getValue && animatedHeight.__getValue() < 0.01
            ? { display: 'none' }
            : {}
        ]}
      >
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
        <View style={{ marginTop: height * 0.005 }}>
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
        </View>
      </Animated.View>
      <View style={styles.matchListContainer}>
        <MatchList
          matchList={mode === 'w' ? splitMatchList.week : splitMatchList.month}
          color={'blue'}
          onScroll={handleMatchListScroll}
          scrollEventThrottle={16}
          headerHeight={mode === 'w' ? 0.2 : 0.35} // 헤더 높이 설정
        />
      </View>
      <View style={[styles.logo, { bottom: mode === 'w' ? -height * 0.3013 : -height * 0.107 }, { opacity: mode === 'w' ? 0.2 : 0.2 }]}>
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
    height: width * 0.9202,
  },
  leagueBackgroundWeek: {
    width: width * 1,
    height: width * 0.4953,
  },
  leagueCalendar: {
    alignItems: 'center',
  },
  leagueCalendarTop: {
    top: -height * 0.015,
  },
  matchListContainer: {
    marginTop: height * 0.03,
    height: height * 0.495,
    zIndex: 1, // 낮은 z-index 추가
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
  calendarView: {
    zIndex: 2, // 높은 z-index 추가
  }
});
