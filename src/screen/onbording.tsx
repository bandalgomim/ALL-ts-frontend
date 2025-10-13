import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { height, width } from '../global';

const slides = [
    { key: '1', title: '앱 시작하기', text: '팀을 선택하고 알림을 받아보세요.', source: require('../assets/onboarding/1번.mov') },
    { key: '2', title: '즐겨찾기',   text: '관심 팀을 등록하면 더 편리합니다.',  source: require('../assets/onboarding/2번.mov') },
    { key: '3', title: '하이라이트', text: '놓친 경기를 빠르게 확인하세요.',     source: require('../assets/onboarding/3번.mov') },
  ];

export default function OnboardingScreen() {
    const [current, setCurrent] = useState(0);

    const renderItem = ({ item, index }: any) => (
        <View style={styles.slide}>
            <Video
                source={item.source}
                style={styles.video}
                resizeMode="cover"
                repeat
                paused={index !== current}           // 현재 슬라이드만 재생
                controls={false}                     // 컨트롤 완전 비활성화
                playInBackground={false}
                playWhenInactive={false}
                allowsExternalPlayback={false}       // iOS: AirPlay 등 외부 재생 금지           // iOS: PiP 금지
                ignoreSilentSwitch="ignore"          // (선택) 무음 스위치에서도 재생
            />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      );

      return (
        <AppIntroSlider
          data={slides}
          renderItem={renderItem}
          onSlideChange={setCurrent}
          onDone={()=>{}}
          showSkipButton
          onSkip={()=>{}}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        />
      );
    }
    const styles = StyleSheet.create({
      slide: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#30397A"},
      video: { width:width*0.8, aspectRatio: 49 / 86, backgroundColor:"black"},
      title: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
      text: { fontSize: 16, color: '#4b5563', textAlign: 'center', lineHeight: 22 },
      dot: { backgroundColor: '#cbd5e1' },
      activeDot: { backgroundColor: '#0f172a', width: 18 },
    });
