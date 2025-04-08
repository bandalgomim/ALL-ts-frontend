// Contents.tsx
import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DAYS_OF_WEEK, getMonthDates, getWeekDates, groupMatchesByDate } from '../utills';
import { matchDto } from '../../../model/main.dto';
import MatchModal from './modal';
import DayRow from './dayRow';
import { width, height } from '../../../global';

interface ContentsProps {
  month: number,
  year: number,
  indicatorDay: Date,
  color: string,
  mode: 'm' | 'w',
  matchList: matchDto[] | null
}

const Contents: React.FC<ContentsProps> = ({ month, year, color, indicatorDay, mode, matchList }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalMatch, setModalMatch] = useState<matchDto[] | null>(null);
  const monthDates = useMemo(() => getMonthDates(month, year), [month, year]);
  const weekDates = useMemo(() => getWeekDates(indicatorDay), [indicatorDay]);
  const groupedMatches = useMemo(() =>
    groupMatchesByDate(matchList),[matchList]); // main.matchList가 변경될 때마다 groupMatchesByDate 실행
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
    if (day instanceof Date) {
      const matchInfo = groupedMatches[day.toISOString().split('T')[0]];
      if (matchInfo) {
        setModalMatch(groupedMatches[day.toISOString().split('T')[0]]);
        setIsVisible(true);
      }
    }
  }, [groupedMatches, setModalMatch, setIsVisible]);
  return (
    <View style={[styles.calendarContainer, {width: width * 0.85, height: mode === 'm' ? height * 0.30 : height * 0.10 }]}>
      <View style={styles.weekRow}>
        {DAYS_OF_WEEK.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            {day === 'S'
            ? <Text style={[fontColor[0], {fontSize: width * 0.067, color: '#DB3D3D'}]}>{day}</Text> :
            <Text style={[fontColor[0], {fontSize: width * 0.067}]}>{day}</Text>}
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
      <DayRow
        days={weekViewDays}
        month={month}
        onPressDate={onPressDate}
        groupedMatches={groupedMatches}
        fontColor={fontColor}
        width={width}
        height={height}
      />)}
      <View style={styles.modalContainer}>
        <MatchModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          matchList={modalMatch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'column',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  weekRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentMonthDayWhite: {
    color: '#F5CEDF',
    fontFamily: 'sb-it-ver1',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  otherMonthDayWhite: {
    color: '#62689a',
    fontFamily: 'sb-it-ver1',
  },
  currentMonthDayBlue: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  otherMonthDayBlue: {
    color: '#cbcbcb',
    fontFamily: 'sb-it-ver1',
  },
  underBar: {
    position: 'absolute',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(Contents);

