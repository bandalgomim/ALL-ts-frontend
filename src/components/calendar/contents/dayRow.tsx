import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { width, height } from '@/global';


interface DayRowProps {
  days: (string | Date)[];
  month: number;
  onPressDate: (date: Date) => void;
  groupedMatches: { [key: string]: any[] };
  fontColor: { color: string; fontFamily: string;}[];
  width: number;
  height: number;
}

const DayRow: React.FC<DayRowProps> = (({ days, month, onPressDate, groupedMatches = {}, fontColor }) => {
  const today = useMemo(() => new Date(), []);

  const fontSizeStyle = useMemo(() => ({ fontSize: width * 0.067 }), []);
  const todayStyle = useMemo(() => ({ color: '#EA5579' }), []);
  const emptyStyle = useMemo(() => ({}), []);
  const underBarStyle = useMemo(() => ({
    height: height * 0.013,
    width: width * 0.1,
    bottom: -height * 0.003,
    right: width * 0.013,
  }), []);

  const getUnderBarSource = useCallback((day: Date) => {
    try {
      if (!groupedMatches) { return null; }
      const dateString = day.toLocaleDateString('sv-SE');
      const matchesForDay = groupedMatches[dateString] || [];
      const matchCount = matchesForDay.length;
      switch (matchCount) {
        case 1:
          return require('@assets/calendar/underBar/1bar.png');
        case 2:
          return require('@assets/calendar/underBar/2bar.png');
        case 3:
          return require('@assets/calendar/underBar/3bar.png');
        default:
          if (matchCount >= 4) {
            return require('@assets/calendar/underBar/4bar.png');
          }
          return null;
      }
    } catch (error) {
      console.warn('날짜 밑줄 처리 중 오류:', error);
      return null;
    }
  }, [groupedMatches]);

  const handlePressDate = useCallback((day: Date) => {
    onPressDate(day);
  }, [onPressDate]);

  const isToday = useCallback((day: Date) => {
    return day.getDate() === today.getDate()
      && day.getMonth() === today.getMonth()
      && day.getFullYear() === today.getFullYear();
  }, [today]);

  const getDayStyle = useCallback((day: string | Date) => {
    if (!(day instanceof Date)) {
      return emptyStyle;
    }
    const baseStyle = day.getMonth() === month
      ? [fontColor[0], fontSizeStyle]
      : [fontColor[1], fontSizeStyle];
    return isToday(day) ? [baseStyle, todayStyle] : [baseStyle, emptyStyle];
  }, [month, fontColor, fontSizeStyle, todayStyle, emptyStyle, isToday]);

  return (
    <View style={styles.weekRow}>
      {days.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <TouchableOpacity onPress={day instanceof Date ? () => handlePressDate(day) : undefined}>
            <Text style={getDayStyle(day)}>
              {day instanceof Date ? day.getDate() : ''}
            </Text>
          </TouchableOpacity>
          {day instanceof Date && (
            <Image
              resizeMode="contain"
              style={[styles.underBar, underBarStyle]}
              source={getUnderBarSource(day)}
            />
          )}
        </View>
      ))}
    </View>
  );
});


const styles = StyleSheet.create({
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.85,
    height: height * 0.05,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  underBar: {
    position: 'absolute',
  },
});
export default React.memo(DayRow);
