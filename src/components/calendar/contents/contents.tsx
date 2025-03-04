// Contents.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { DAYS_OF_WEEK, getMonthDates, getWeekDates } from '../utills';


interface ContentsProps {
  month: number;
  year: number;
  today: Date;
  color: string;
  mode: "m" | "w";
}

const Contents: React.FC<ContentsProps> = ({ month, year, color, today, mode }) => {
  const { width, height } = Dimensions.get('window');

  const monthDates: (Date | string)[] = getMonthDates(month, year)
  const weekDates: (Date | string)[] = getWeekDates(today)

  let fontColor = [];

  if ( color === "white") {
    fontColor = [styles.currentMonthDayWhite, styles.otherMonthDayWhite]
  } else {
    fontColor = [styles.currentMonthDayBlue, styles.otherMonthDayBlue]
  }

  return (
    <View style={[styles.calendarContainer, {width: width*0.8, height: mode === 'm' ? height * 0.30 : height * 0.10 }]}>
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
                onPress={() => {
                  if (day instanceof Date) {
                    const year = day.getFullYear();
                    const month = day.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해야 실제 월이 나옵니다.
                    const date = day.getDate();
                    console.log(`Year: ${year}, Month: ${month}, Date: ${date}`);
                  }
                }}
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
              {day instanceof Date && day.getDate() === 1 && <Image resizeMode="contain" style={[styles.underBar, {height: height*0.013, width: width*0.1, bottom: -height*0.003, right: width*0.011}]} source={require('./../../../assets/calendar/underBar/1bar.png')} />}
              {day instanceof Date && day.getDate() === 3 && <Image resizeMode="contain" style={[styles.underBar, {height: height*0.013, width: width*0.1, bottom: -height*0.003, right: width*0.011}]} source={require('./../../../assets/calendar/underBar/2bar.png')} />}
              {day instanceof Date && day.getDate() === 5 && <Image resizeMode="contain" style={[styles.underBar, {height: height*0.013, width: width*0.1, bottom: -height*0.003, right: width*0.011}]} source={require('./../../../assets/calendar/underBar/3bar.png')} />}
              {day instanceof Date && day.getDate() === (17) && <Image resizeMode="contain" style={[styles.underBar, {height: height*0.013, width: width*0.1, bottom: -height*0.003, right: width*0.011}]} source={require('./../../../assets/calendar/underBar/4bar.png')} />}
            </View>
          ))}
        </View>
      )) :
      <View style={styles.weekRow}>
        
        {weekDates.slice(0, 7).map((day, index) => (
          <View key={index} style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {
              if (day instanceof Date) {
                const year = day.getFullYear();
                const month = day.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해야 실제 월이 나옵니다.
                const date = day.getDate();
                console.log(`Year: ${year}, Month: ${month}, Date: ${date}`);
              }
            }}
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
          {day instanceof Date && day.getDate() === 1 && <Image resizeMode="contain" style={[styles.underBar, {height: height*0.013, width: width*0.1, bottom: -height*0.003, right: width*0.011}]} source={require('./../../../assets/calendar/underBar/1bar.png')} />}
          {day instanceof Date && day.getDate() === 3 && <Image resizeMode="contain" style={[styles.underBar, {height: height*0.013, width: width*0.1, bottom: -height*0.003, right: width*0.011}]} source={require('./../../../assets/calendar/underBar/2bar.png')} />}
          {day instanceof Date && day.getDate() === 5 && <Image resizeMode="contain" style={[styles.underBar, {height: height*0.013, width: width*0.1, bottom: -height*0.003, right: width*0.011}]} source={require('./../../../assets/calendar/underBar/3bar.png')} />}
          {day instanceof Date && day.getDate() === (17) && <Image resizeMode="contain" style={[styles.underBar, {height: height*0.013, width: width*0.1, bottom: -height*0.003, right: width*0.011}]} source={require('./../../../assets/calendar/underBar/4bar.png')} />}
        </View>
        ))}
      </View>
      
      }
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'column',
    //borderWidth: 1
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
    //borderWidth: 1
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
    
  }
});


export default Contents;

