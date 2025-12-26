import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import MainHeader from './headers/MainHeader';
import Contents from './contents/contents';
import Mode from './mode/mode';
import { goToPrevious, goToNext, getMonthDates, getWeekDates } from './utills';
import { width, height } from '@/global';
import { getMainResDto, leagueDto, matchDto, teamDto } from '@model/main.dto';
import MatchList from '@components/matchBar/matchList';
import TeamAndLeagueListBar from '@components/main/teamAndLeagueListBar';
import { localDataMmkv } from '@IAM/localData';

interface MainCalendarProps {
  data: getMainResDto;
}

const MainCalendar: React.FC<MainCalendarProps> = ({ data }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<string>(localDataMmkv.get('mode') as string);
  const [zIndex, setZIndex] = useState<boolean>(true); // z-index 상태 추가
  const animatedHeight = useRef(new Animated.Value(1)).current;
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
      if (data.matchList && data.matchList[key]) {
        weekResult[key] = data.matchList[key];
      }
    });
    monthDates.forEach((date) => {
      const key = date.toLocaleDateString('sv-SE');
      if (data.matchList && data.matchList[key]) {
        monthResult[key] = data.matchList[key];
      }
    });

    return { week: weekResult, month: monthResult };
  }, [weekDates, monthDates, data.matchList]);

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
      outputRange: mode === 'm' ? [height * 0.02, height * 0.18] : [height * 0.04, 0], // 접힘/펼침 높이(px) 원하는 값으로 조정
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
      <View style={styles.CalendarContainer}>
        <Animated.View style={[calendarAnimatedStyle, styles.animatedContainer, zIndex ? styles.zIndexHigh : styles.zIndexLow]}>
          <TeamAndLeagueListBar
            teamAndLeagueList={data?.teamAndLeagueList as (teamDto | leagueDto)[]}
          />
          <View style={styles.contentWrapper} {...panResponder.panHandlers}>
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
        <View style={[mode === 'w' ? styles.matchListWeek : styles.matchListMonth, zIndex ? styles.zIndexLow : styles.zIndexHigh]}>
          <MatchList
            matchList={mode === 'w' ? splitMatchList.week : splitMatchList.month}
            color={'white'}
            onScroll={handleMatchListScroll}
            scrollEventThrottle={16}
            headerHeight={0.35}
          />
        </View>
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
  animatedContainer: {
    alignItems: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    marginTop: -height * 0.025,
  },
  zIndexHigh: {
    zIndex: 2,
  },
  zIndexLow: {
    zIndex: 1,
  },
  matchListWeek: {
    marginTop: -height * 0.02,
    height: height * 0.62,
    alignItems: 'center',
  },
  matchListMonth: {
    height: height * 0.62,
    alignItems: 'center',
  },
});

export default React.memo(MainCalendar);
