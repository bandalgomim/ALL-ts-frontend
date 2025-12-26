import React from 'react';
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
  const today = new Date();
  return (
    <View style={styles.weekRow}>
      {days.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <TouchableOpacity onPress={() => day instanceof Date && onPressDate(day as Date)}>
            <Text
              style={day instanceof Date
                ? [
                    day.getMonth() === month
                      ? [fontColor[0], { fontSize: width * 0.067 }]
                      : [fontColor[1], { fontSize: width * 0.067 }],
                    day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()
                      ? { color: '#EA5579' }
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
