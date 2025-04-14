import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface DayRowProps {
  days: (string | Date)[];
  month: number;
  onPressDate: (date: Date) => void;
  groupedMatches: { [key: string]: any[] }; // 날짜별 매칭된 데이터
  fontColor: { color: string; fontFamily: string;}[];
  width: number;
  height: number;
}

const DayRow: React.FC<DayRowProps> = (({ days, month, onPressDate, groupedMatches, fontColor, width, height }) => {
  const today = new Date();
  today.setHours(today.getHours() + 9);
  return (
    <View style={styles.weekRow}>
      {days.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <TouchableOpacity onPress={() => day && onPressDate(day as Date)}>
          <Text
              style={day instanceof Date
                ? [
                    day.getMonth() === month
                      ? [fontColor[0], { fontSize: width * 0.067 }]
                      : [fontColor[1], { fontSize: width * 0.067 }],
                    // 오늘 날짜일 때 색상 변경
                    day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()
                      ? { color: '#EA5579' } // 오늘 날짜일 경우, 흰색으로 변경
                      : {},
                  ]
                : {}
              }
            >
              {day instanceof Date ? day.getDate() : ''}
            </Text>
          </TouchableOpacity>
          {day instanceof Date && (
            <Image
              resizeMode="contain"
              style={[styles.underBar, { height: height * 0.013, width: width * 0.1, bottom: -height * 0.003, right: width * 0.013 }]}
              source={(() => {
                const dateString = day.toLocaleDateString('sv-SE'); // "2025-02-28" 형태로 추출
                const matchesForDay = groupedMatches[dateString];
                const matchCount = matchesForDay ? matchesForDay.length : 0;
                switch (matchCount) {
                  case 1:
                    return require('./../../../assets/calendar/underBar/1bar.png');
                  case 2:
                    return require('./../../../assets/calendar/underBar/2bar.png');
                  case 3:
                    return require('./../../../assets/calendar/underBar/3bar.png');
                  default:
                    if (matchCount >= 4) {
                      return require('./../../../assets/calendar/underBar/4bar.png');
                    }
                    return null;
                }
              })()}
            />
          )}
        </View>
      ))}
    </View>
  );
});


const styles = StyleSheet.create({
  weekRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
