import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, Image, StyleSheet } from 'react-native';

const slides = [
  {
    key: '1',
    title: 'ALL’ts 시작하기',
    text: '팀을 선택하고 경기 알림을 받아보세요.',
    image: require('../assets/searchBar/searchBar_blue.png'),
    backgroundColor: '#fff',
  },
  {
    key: '2',
    title: '일정 관리',
    text: '내 팀의 일정을 한눈에!',
    image: require('../assets/searchBar/searchBar_blue.png'),
    backgroundColor: '#fef3c7',
  },
];

export default function OnboardingScreen() {

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={() => {}}
      showSkipButton
      onSkip={() => {}}
    />
  );
}

const styles = StyleSheet.create({
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  image: { width: 280, height: 280, marginBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  text: { fontSize: 16, color: '#555', textAlign: 'center' },
});
