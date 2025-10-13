import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, StyleSheet } from 'react-native';
import { height, width } from '../global';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TimedImageViewer from '../components/onboarding/timedImageViewer';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainPageParamList } from '../model/navigation.dto';

const slides = [
  {
    key: '1',
    title: '앱 시작하기',
    text: '팀을 선택하고 알림을 받아보세요.',
    backgroundColor: '#30397A',
    source: [
      require('../assets/onboarding/1-1.png'),
      require('../assets/onboarding/1-2.png'),
      require('../assets/onboarding/1-3.png'),
      require('../assets/onboarding/1-4.png'),
    ],
  },
  {
    key: '2',
    title: '앱 시작하기',
    text: '팀을 선택하고 알림을 받아보세요.',
    backgroundColor: 'white',
    source: [
      require('../assets/onboarding/2-1.png'),
      require('../assets/onboarding/2-2.png'),
      require('../assets/onboarding/2-3.png'),
      require('../assets/onboarding/2-4.png'),
      require('../assets/onboarding/2-5.png'),
      require('../assets/onboarding/2-6.png'),
    ],
  },
  {
    key: '3',
    title: '앱 시작하기',
    text: '팀을 선택하고 알림을 받아보세요.',
    backgroundColor: '#30397A',
    source: [
      require('../assets/onboarding/3-1.png'),
      require('../assets/onboarding/3-2.png'),
      require('../assets/onboarding/3-3.png'),
    ],
  },

];

export default function OnboardingScreen() {
    const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
      const navigateMain = () => {
        navigationMain.replace('MainScreen', undefined);
      };
    const [current, setCurrent] = useState(0);
    const isFocused = useIsFocused();

    const renderItem = ({ item, index }: any) => (
        <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
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
          onDone={()=>{navigateMain();}}
          showSkipButton
          onSkip={()=>{}}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        />
      );
    }
    const styles = StyleSheet.create({
      slide: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -height * 0.2 },
      title: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
      text: { fontSize: 16, color: '#4b5563', textAlign: 'center', lineHeight: 22 },
      dot: { backgroundColor: '#cbd5e1' },
      activeDot: { backgroundColor: '#0f172a', width: 18 },
    });
