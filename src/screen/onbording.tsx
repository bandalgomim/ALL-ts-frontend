import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, StyleSheet } from 'react-native';
import { width } from '../global';
import { useIsFocused } from '@react-navigation/native';
import TimedImageViewer from '../components/onboarding/timedImageViewer';

const slides = [
    { key: '1', title: '앱 시작하기', text: '팀을 선택하고 알림을 받아보세요.', source: [require('../assets/onboarding/이미지 전.png'), require('../assets/onboarding/이미지 후.png')] },
  ];

export default function OnboardingScreen() {
    const [current, setCurrent] = useState(0);
    const isFocused = useIsFocused();

    const renderItem = ({ item, index }: any) => (
        <View style={styles.slide}>
          <TimedImageViewer
            images={item.source}
            isActive={isFocused}
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
      title: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
      text: { fontSize: 16, color: '#4b5563', textAlign: 'center', lineHeight: 22 },
      dot: { backgroundColor: '#cbd5e1' },
      activeDot: { backgroundColor: '#0f172a', width: 18 },
    });
