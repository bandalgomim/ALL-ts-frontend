import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, PanResponder, Animated } from 'react-native';
import MainHeader from './headers/MainHeader';
import Contents from './contents/contents';
import Mode from './mode/mode';
import { goToPrevious, goToNext, getMonthDates, getWeekDates } from './utills';
import { width, height } from '../../global';
import { getmainResDto, leagueDto, matchDto, teamDto } from '../../model/main.dto';
import MatchList from '../matchBar/matchList';
import TeamAndLeagueListBar from '../main/teamAndLeagueListBar';
import { MainContext } from '../../context/main.context';

interface MainCalendarProps {
  data: getmainResDto;
}

const MainCalendar: React.FC<MainCalendarProps> = ({ data }) => {
  const {mainRes} = useContext(MainContext);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' | 'w'>('w');
  const [zIndex, setZIndex] = useState<boolean>(true); // z-index 상태 추가
  const animatedHeight = useRef(new Animated.Value(1)).current;
  console.log(mainRes)
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
      if (data.matchList && data.matchList[key]) {
        result[key] = data.matchList[key];
      }
    });
    return result;
  }, [weekDates, data.matchList]);

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

  // calendarView의 높이/투명도 애니메이션 스타일
  const calendarAnimatedStyle = {
    height: animatedHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [height * 0.02, 0], // 원하는 높이로 조정
      extrapolate: 'clamp',
    }),
    opacity: animatedHeight.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.3, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View>
      <View
        style={styles.CalendarContainer}
        {...panResponder.panHandlers}
      >
        <Animated.View style={[styles.calendarView, calendarAnimatedStyle, {alignItems: 'center', zIndex: zIndex ? 2 : 1}]}>
          <TeamAndLeagueListBar
            teamAndLeagueList={mainRes?.data?.teamAndLeagueList as (teamDto | leagueDto)[]}
          />
          <View style={{alignItems: 'center', marginTop: -height * 0.025}}>
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
            monthDates={monthDates}
            weekDates={weekDates}
            month={currentDate.getMonth()}
            color={'white'}
            mode={mode}
            matchList={data.matchList ? data.matchList : null}
            goToPrevious={handlePrevious}
            goToNext={handleNext}
          />
          </View>
        </Animated.View>
        {mode === 'w' ? (
          <View style={[styles.matchListContainer, { zIndex: zIndex ? 1 : 2 }]}>
            <MatchList
              matchList={splitMatchList}
              color={'white'}
              onScroll={handleMatchListScroll}
              scrollEventThrottle={16}
              headerHeight={0.35} // 헤더 높이 설정
            />
          </View>
        ) : (
          <View style={[styles.banner, { width: width * 0.85, height: height * 0.06, marginTop: height * 0.53 }]}>
            <Text style={[styles.bannerText, { fontSize: width * 0.07 }]}>advertisement banner</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CalendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,

  },
  matchListContainer: {
    width: width,
    height: height * 0.62,
    alignItems: 'center',
    zIndex: 1, // 낮은 z-index 추가
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
  calendarView: {

  }
});

export default React.memo(MainCalendar);