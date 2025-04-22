// Contents.tsx
import React, { useCallback, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { DAYS_OF_WEEK, getMonthDates, getWeekDates, groupMatchesByDate } from '../utills';
import { matchListDto } from '../../../model/main.dto';
import DayRow from './dayRow';
import { width, height } from '../../../global';
import { ModalContext } from '../../../context/modal.context';

interface ContentsProps {
  month: number,
  year: number,
  indicatorDay: Date,
  color: string,
  mode: 'm' | 'w',
  matchList: matchListDto | null,
  goToPrevious: () => void,
  goToNext: () => void,
}

const Contents: React.FC<ContentsProps> = ({
  month, year, color, indicatorDay, mode, matchList, goToPrevious, goToNext
}) => {
  const {setModalVisible, setModalContents} = useContext(ModalContext);
  const monthDates = useMemo(() => getMonthDates(month, year), [month, year]);
  const weekDates = useMemo(() => getWeekDates(indicatorDay), [indicatorDay]);
  const groupedMatches = useMemo(() =>
    matchList,[matchList]); // main.matchList가 변경될 때마다 groupMatchesByDate 실행
  const fontColor = useMemo(() => {
    return color === 'white'
      ? [styles.currentMonthDayWhite, styles.otherMonthDayWhite]
      : [styles.currentMonthDayBlue, styles.otherMonthDayBlue];
  }, [color]);

  
  const weekViewDays = useMemo(() => {
    return weekDates.slice(0, 7);
  }, [weekDates]);

  const monthViewDaysRows = useMemo(() => {
    return [...Array(5)].map((_, rowIndex) => {
      return monthDates.slice(rowIndex * 7, rowIndex * 7 + 7);
    });
  }, [monthDates]);

  const onPressDate = useCallback((day: Date) => {
    const date = day.toISOString().split('T')[0];
    if (day instanceof Date) {
      const matchInfo = groupedMatches[date];
      if (matchInfo) {
        setModalContents({"test":matchInfo});
        setModalVisible(true);
      }
    }
  }, [groupedMatches, setModalContents, setModalVisible]);

  // PanResponder로 좌우 스와이프 감지
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > 40) {
            goToPrevious();
          } else if (gestureState.dx < -40) {
            goToNext();
          }
        },
      }),
    [goToPrevious, goToNext]
  );

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        styles.calendarContainer,
        mode === 'm' ? styles.monthModeContainer : styles.weekModeContainer
      ]}
    >
      <View style={styles.weekRow}>
        {DAYS_OF_WEEK.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            {day === 'S'
              ? <Text style={[fontColor[0], styles.dayText, styles.sunday]}>{day}</Text>
              : <Text style={[fontColor[0], styles.dayText]}>{day}</Text>}
          </View>
        ))}
      </View>
      {mode === 'm' ? monthViewDaysRows.map((rowDays, rowIndex) => (
        <DayRow
          key={rowIndex}
          days={rowDays}
          month={month}
          onPressDate={onPressDate}
          groupedMatches={groupedMatches}
          fontColor={fontColor}
          width={width}
          height={height}
        />
      )) : (
        <>
          <DayRow
            days={weekViewDays}
            month={month}
            onPressDate={onPressDate}
            groupedMatches={groupedMatches}
            fontColor={fontColor}
            width={width}
            height={height}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  monthModeContainer: {
    width: width,
    height: height * 0.30,
  },
  weekModeContainer: {
    width: width,
    height: height * 0.10,
  },
  dayContainer: {
    flex: 1,
    width: width * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  weekRow: {
    width: width * 0.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    fontSize: width * 0.067,
  },
  sunday: {
    color: '#DB3D3D',
  },
  currentMonthDayWhite: {
    color: '#F5CEDF',
    fontFamily: 'sb-it-ver1',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  otherMonthDayWhite: {
    color: '#62689a',
    fontFamily: 'sb-it-ver1',
  },
  currentMonthDayBlue: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  otherMonthDayBlue: {
    color: '#cbcbcb',
    fontFamily: 'sb-it-ver1',
  },
  underBar: {
    position: 'absolute',
  },
});

export default React.memo(Contents);

