// Contents.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Button } from 'react-native';
import { DAYS_OF_WEEK, getMonthDates, getWeekDates, groupMatchesByDate } from '../utills';
import { match } from '../../../model/main.dto';
import { MatchModal } from './modal';


interface ContentsProps {
  month: number,
  year: number,
  today: Date,
  color: string,
  mode: "m" | "w",
  matchList: match[] | null
}

const Contents: React.FC<ContentsProps> = ({ month, year, color, today, mode, matchList }) => {
  const { width, height } = Dimensions.get('window');
  const monthDates: (Date | string)[] = getMonthDates(month, year)
  const weekDates: (Date | string)[] = getWeekDates(today)
  const groupedMatches = groupMatchesByDate(matchList); // main.matchList가 변경될 때마다 groupMatchesByDate 실행
  const [isVisible, setIsVisible] = useState(false);
  const [modalMatch, setModalMatch] = useState<match[] | null>(null);

  let fontColor = [];
  if ( color === "white") {
    fontColor = [styles.currentMonthDayWhite, styles.otherMonthDayWhite]
  } else {
    fontColor = [styles.currentMonthDayBlue, styles.otherMonthDayBlue]
  }
  const onPressDate = (day: Date) => {
    if (day instanceof Date) {
      setModalMatch(groupedMatches[day.toISOString().split('T')[0]]);
      setIsVisible(true)
    }
  }
  return (
    <View style={[styles.calendarContainer, {width: width*0.85, height: mode === 'm' ? height * 0.30 : height * 0.10 }]}>
      {/* Day of Week */}
      <View style={styles.weekRow}>
        {DAYS_OF_WEEK.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            {day === 'S' 
            ? <Text style={[fontColor[0], {fontSize: width*0.067, color: '#DB3D3D'}]}>{day}</Text> : 
            <Text style={[fontColor[0], {fontSize: width*0.067}]}>{day}</Text>}
          </View>
        ))}
      </View>
      {mode === 'm' ? [...Array(5)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.weekRow}>
          {monthDates.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <TouchableOpacity
                onPress={() => {onPressDate(day as Date)}}
              >
                <Text
                  style={
                    day instanceof Date
                      ? day.getMonth() === month
                        ? [fontColor[0], {fontSize: width*0.067}]
                        : [fontColor[1], {fontSize: width*0.067}]
                      : {}
                  }
                >
                  {day instanceof Date ? day.getDate() : ''}
                </Text>
              </TouchableOpacity>
              {day instanceof Date && (
                <Image
                  resizeMode="contain"
                  style={[styles.underBar, {height: height * 0.013, width: width * 0.1, bottom: -height * 0.003, right: width * 0.013}]}
                  source={
                    (() => {
                      const dateString = day.toISOString().split('T')[0]; // "2025-02-28" 형태로 추출
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
                            return require('./../../../assets/calendar/underBar/4bar.png'); // 4 이상일 때는 4번째 이미지 반환
                          }
                          return null; // 이미지가 없으면 null 반환
                      }
                    })()
                  }
                />
              )}
            </View>
          ))}
        </View>
      )) :
      <View style={styles.weekRow}>
        {weekDates.slice(0, 7).map((day, index) => (
          <View key={index} style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {onPressDate(day as Date)}}
          >
            <Text
              style={
                day instanceof Date
                  ? day.getMonth() === month
                    ? [fontColor[0], {fontSize: width*0.067}]
                    : [fontColor[1], {fontSize: width*0.067}]
                  : {}
              }
            >
              {day instanceof Date ? day.getDate() : ''}
            </Text>
          </TouchableOpacity>
          {day instanceof Date && (
            <Image
              resizeMode="contain"
              style={[styles.underBar, {height: height * 0.013, width: width * 0.1, bottom: -height * 0.003,right: width * 0.013,}]}
              source={
                (() => {
                  const dateString = day.toISOString().split('T')[0]; // "2025-02-28" 형태로 추출
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
                        return require('./../../../assets/calendar/underBar/4bar.png'); // 4 이상일 때는 4번째 이미지 반환
                      }
                      return null; // 이미지가 없으면 null 반환
                  }
                })()
              }
            />
          )}
          </View>
        ))}
      </View>
      }
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
    // 
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  weekRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // 
  },
  currentMonthDayWhite: {
    color: '#F5CEDF',
    fontFamily: 'built titling sb it',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경

  },
  otherMonthDayWhite: {
    color: '#62689a',
    fontFamily: 'built titling sb it'
  },
  currentMonthDayBlue: {
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
  otherMonthDayBlue: {
    color: '#cbcbcb',
    fontFamily: 'built titling sb it'
  },
  underBar: {
    position: 'absolute',
  },
  modalContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
  }
});


export default Contents;

