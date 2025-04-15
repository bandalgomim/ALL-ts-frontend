import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Platform, UIManager } from 'react-native';
import Contents from './contents/contents';
import Header from './headers/Header';
import Mode from './mode/mode';
import { ApiContext } from '../../context/context';
import { goToPrevious, goToNext } from './utills';
import { width, height } from '../../global';

// Android를 위한 설정
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function LeagueCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'m' |'w'>('w');
  const {leagueRes} = useContext(ApiContext);
  
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

  // Handlers for changing the month
  const handlePrevious = useCallback(() => {
    const newDate = goToPrevious(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]);

  const handleNext = useCallback(() => {
    const newDate = goToNext(currentDate, mode);
    setCurrentDate(newDate);
  }, [currentDate, mode]);

  return (
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width * 0.94 : width * 0.52}]}>
      {/* 이전 모드 이미지 (페이드 아웃) */}
      <Animated.Image
        resizeMode="contain"
        style={[
          styles.leagueBackground, 
          {
            width: width * 1, 
            height: prevMode === 'm' ? width * 0.92 : width * 0.495,
            opacity: oldImageOpacity
          }
        ]}
        source={prevMode === 'm' ? 
          require('./../../assets/calendar/leagueBackground.png') : 
          require('./../../assets/calendar/leagueBackground_s.png')
        } 
      />
      
      {/* 새 모드 이미지 (페이드 인) */}
      <Animated.Image
        resizeMode="contain"
        style={[
          styles.leagueBackground, 
          {
            width: width * 1, 
            height: mode === 'm' ? width * 0.92 : width * 0.495,
            opacity: newImageOpacity
          }
        ]}
        source={mode === 'm' ? 
          require('./../../assets/calendar/leagueBackground.png') : 
          require('./../../assets/calendar/leagueBackground_s.png')
        } 
      />
      <Header
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
        type={'league'}
        goToPrevious={handlePrevious}
        goToNext={handleNext}
      />
      <View style={[styles.leagueCalendar, {top: -height * 0.015}]}>
        <Mode
          type={'white'}
          mode={mode}
          setMode={setMode}
        />
        <Contents
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          indicatorDay={currentDate}
          color={'white'}
          mode={mode}
          matchList={leagueRes.data.matchList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    CalendarContainer: {
    alignItems: 'center',
  },
  leagueBackground: {
    position: 'absolute',
  },
  leagueCalendar: {
    alignItems: 'center',
  },
});
