// Contents.tsx
import React, { useCallback, useContext, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DAYS_OF_WEEK } from '../utills';
import { matchListDto } from '../../../model/main.dto';
import DayRow from './dayRow';
import { width, height } from '../../../global';
import { useModalActions } from '../../../context/modal/modal.context.tsx';

interface ContentsProps {
  monthDates: (string | Date)[],
  weekDates: Date[],
  month: number,
  color: string,
  mode: string,
  matchList: matchListDto | null,
  goToPrevious: () => void,
  goToNext: () => void,
}

const Contents: React.FC<ContentsProps> = ({
  monthDates, weekDates, month, color, mode, matchList, goToPrevious, goToNext
}) => {

  ('Contents.tsx');
  const { open } = useModalActions();
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
    const date = day.toLocaleDateString('sv-SE');
    if (day instanceof Date) {
      const matchInfo = groupedMatches ? groupedMatches[date] : null;
      if (matchInfo) {
        open({'contents':matchInfo})
      }
    }
  }, [groupedMatches]);

  return (
    <View
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
          groupedMatches={groupedMatches || {}}
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
            groupedMatches={groupedMatches || {}}
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

