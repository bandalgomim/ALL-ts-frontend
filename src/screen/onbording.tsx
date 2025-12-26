import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, StyleSheet } from 'react-native';
import { height, width } from '@/global';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TimedImageViewer from '@components/onboarding/timedImageViewer';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainPageParamList } from '@model/navigation.dto';
import { localData } from '@IAM/localData';

const slides = [
  {
    key: '1',
    title: '앱 시작하기',
    text: '원하는 팀과 리그를 검색해 보세요.',
    backgroundColor: '#30397A',
    source: [
      require('@assets/onboarding/1-1.png'),
      require('@assets/onboarding/1-2.png'),
      require('@assets/onboarding/1-3.png'),
      require('@assets/onboarding/1-4.png'),
    ],
  },
  {
    key: '2',
    title: '선택하기',
    text: '원하는 팀과 리그 그리고 매치를 선택하세요.',
    backgroundColor: 'white',
    source: [
      require('@assets/onboarding/2-1.png'),
      require('@assets/onboarding/2-2.png'),
      require('@assets/onboarding/2-3.png'),
      require('@assets/onboarding/2-4.png'),
      require('@assets/onboarding/2-5.png'),
      require('@assets/onboarding/2-6.png'),
    ],
  },
  {
    key: '3',
    title: '순위 확인하기기',
    text: '팀과 리그 전체의 순위를 확인하세요.',
    backgroundColor: 'white',
    source: [
      require('@assets/onboarding/3-1.png'),
      require('@assets/onboarding/3-2.png'),
      require('@assets/onboarding/3-3.png'),
      require('@assets/onboarding/3-4.png'),
      require('@assets/onboarding/3-5.png'),
      require('@assets/onboarding/3-6.png'),
    ],
  },
  {
    key: '4',
    title: '매치 확인하기',
    text: '실시간 스코어와 하이라이트를 받아보세요.',
    backgroundColor: '#30397A',
    source: [
      require('@assets/onboarding/4-1.png'),
      require('@assets/onboarding/4-2.png'),
      require('@assets/onboarding/4-3.png'),
      require('@assets/onboarding/4-4.png'),
    ],
  },
  {
    key: '5',
    title: '로고 변경하기',
    text: '여러분의 특별한 로고로 변경하세요.',
    backgroundColor: 'white',
    source: [
      require('@assets/onboarding/5-1.png'),
      require('@assets/onboarding/5-2.png'),
      require('@assets/onboarding/5-3.png'),
      require('@assets/onboarding/5-4.png'),
      require('@assets/onboarding/5-5.png'),
    ],
  },
];

export default function OnboardingScreen() {
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = async () => {
      await localData.set('onbording', 'true');
      navigationMain.replace('MainScreen', undefined);
    };

  const [current, setCurrent] = useState(0);
  const isFocused = useIsFocused();

  const renderItem = ({ item, index }: any) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <View>
        <TimedImageViewer
          images={item.source}
          isActive={isFocused && current === index} // ✅ 현재 슬라이드만 재생
        />
      </View>
      <View style={[styles.textView, styles.textViewOpacity, {backgroundColor: item.backgroundColor}]}>
        <Text style={[styles.title, item.backgroundColor === 'white' ? styles.textForWhite : styles.textForBlue]}>{item.title}</Text>
        <Text style={[styles.text, item.backgroundColor === 'white' ? styles.textForWhite : styles.textForBlue]}>{item.text}</Text>
      </View>
    </View>
  );
    // ✅ Next 버튼
    const renderNextButton = () => (
      <View style={styles.buttonContainer}>
        <Text style={styles.nextText}>다음</Text>
      </View>
    );
    // ✅ Skip 버튼
    const renderSkipButton = () => (
      <View style={styles.buttonContainer}>
        <Text style={styles.skipText}>완료</Text>
      </View>
    );
    // ✅ Done 버튼
    const renderDoneButton = () => (
      <View style={styles.buttonContainer}>
        <Text style={styles.doneText}>완료</Text>
      </View>
    );
  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onSlideChange={setCurrent}
      onDone={()=>navigateMain()}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
      renderDoneButton={renderDoneButton}
      showSkipButton
      onSkip={() => {navigateMain();}}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    />
  );
}
    const styles = StyleSheet.create({
      slide: { flex: 1, alignItems: 'center'},
      textView: { marginTop: -height * 0.235, width: width, height: height * 0.08, justifyContent: 'center' },
      textViewOpacity: { opacity: 0.9 },
      title: { fontSize: 25, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
      text: { fontSize: 19, textAlign: 'center', lineHeight: 22 },
      dot: { backgroundColor: '#cbd5e1', borderWidth:0},
      activeDot: { backgroundColor: '#EA5579', width: 18, borderWidth:0 },
      buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#EA5579',
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      // ✅ 버튼 텍스트 개별 스타일
      skipText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textShadowColor: '#af405b', // 그림자 색상
        textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
        textShadowRadius: 3, // 그림자 반경
        width: width * 0.15,
        textAlign: 'center',
      },
      nextText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        textShadowColor: '#af405b', // 그림자 색상
        textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
        textShadowRadius: 3, // 그림자 반경
        width: width * 0.15,
        textAlign: 'center',
      },
      doneText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        textShadowColor: '#af405b', // 그림자 색상
        textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
        textShadowRadius: 3, // 그림자 반경
        width: width * 0.15,
        textAlign: 'center',
      },
      textForBlue: {
        color: 'white',
        textShadowColor: '#242b5c',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 3,
      },
      textForWhite: {
        color: '#30397A',
        textShadowColor: '#bdb4b4',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 3,
      },
    });
