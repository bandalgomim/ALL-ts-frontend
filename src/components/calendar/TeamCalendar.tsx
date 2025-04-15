import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Platform, UIManager } from 'react-native';
import Contents from './contents/contents';
import Mode from './mode/mode';
import Header from './headers/Header';
import { ApiContext } from '../../context/context';
import { width, height } from '../../global';

// Android를 위한 설정
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function TeamCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' |'w'>('m');
  const {teamRes} = useContext(ApiContext);
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  // 새로운 이미지 opacity 애니메이션 값
  const newImageOpacity = useRef(new Animated.Value(1)).current;
  // 이전 이미지의 opacity 애니메이션 값
  const oldImageOpacity = useRef(new Animated.Value(0)).current;
  // 이전 모드 상태 저장
  const [prevMode, setPrevMode] = useState<'m' | 'w'>(mode);

  // 모드 변경 시 애니메이션 실행
  useEffect(() => {
    if (prevMode !== mode) {
      // 이전 모드 업데이트
      setPrevMode(prevMode);
      
      // 애니메이션 시작: 이전 이미지를 보이게, 새 이미지는 숨김
      newImageOpacity.setValue(0);
      oldImageOpacity.setValue(1);
      
      // 크로스페이드 애니메이션
      Animated.parallel([
        Animated.timing(newImageOpacity, {
          toValue: 1,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(oldImageOpacity, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        })
      ]).start(() => {
        // 애니메이션 완료 후 이전 모드를 현재 모드로 업데이트
        setPrevMode(mode);
      });
    }
  }, [mode, newImageOpacity, oldImageOpacity, prevMode]);

  const goToPrevious = () => {
    const newDate = new Date(currentDate);  // currentDate 복사
    if (mode === 'm') {
      newDate.setMonth(month - 1);  // 한 달 전으로 설정
    } else {
      newDate.setDate(newDate.getDate() - 7);  // 7일 전으로 설정
    }
    // 새로운 달로 넘어간 경우, month 값이 증가하는 경우 자동으로 달 +1 해주기
    if (newDate.getMonth() !== month) {
      newDate.setMonth(month - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);  // currentDate 복사
    if (mode === 'm') {
      newDate.setMonth(month + 1);  // 한 달 후로 설정
    } else {
      newDate.setDate(newDate.getDate() + 7);  // 7일 후로 설정
    }
    // 새로운 달로 넘어간 경우, month 값이 증가하는 경우 자동으로 달 +1 해주기
    if (newDate.getMonth() !== month) {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width * 0.94 : width * 0.52}]}>
      {/* 이전 모드 이미지 (페이드 아웃) */}
      <Animated.Image
        resizeMode="contain"
        style={[
          styles.teamBackground, 
          {
            width: width * 1, 
            height: prevMode === 'm' ? width * 0.92 : width * 0.495,
            opacity: oldImageOpacity
          }
        ]}
        source={prevMode === 'm' ? 
          require('./../../assets/calendar/teamBackground.png') : 
          require('./../../assets/calendar/teamBackground_s.png')
        } 
      />
      
      {/* 새 모드 이미지 (페이드 인) */}
      <Animated.Image
        resizeMode="contain"
        style={[
          styles.teamBackground, 
          {
            width: width * 1, 
            height: mode === 'm' ? width * 0.92 : width * 0.495,
            opacity: newImageOpacity
          }
        ]}
        source={mode === 'm' ? 
          require('./../../assets/calendar/teamBackground.png') : 
          require('./../../assets/calendar/teamBackground_s.png')
        } 
      />
      
      <Header
        year={year}
        month={month}
        type={'team'}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
      <View style={[styles.teamCalendar, {top: -height * 0.015}]}>
        <Mode
          type={'blue'}
          mode={mode}
          setMode={setMode}
        />
        <Contents
          key={`contents-${mode}-${month}-${year}`}
          month={month}
          year={year}
          indicatorDay={currentDate}
          color={'blue'}
          mode={mode}
          matchList={teamRes.data.matchList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CalendarContainer: {
    alignItems: 'center',
  },
  teamBackground: {
    position: 'absolute',
  },
  teamCalendar: {
    alignItems: 'center',
  },
});
