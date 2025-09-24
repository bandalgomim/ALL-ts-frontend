import React from 'react';
import { View, StyleSheet } from 'react-native';
import MatchModal from '../components/calendar/contents/modal';
import SerchModal from './searchBar/serchModal';
import NextMatchModal from './nextMatchModal';
import LogoModal from './logo/logoModal';

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <MatchModal />
      <SerchModal />
      <NextMatchModal />
      <LogoModal/>

    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 0, // 헤더 자체는 안 보이게
    width: 0,
    position: 'absolute', // 모달 위치 제어에 영향 없도록
  },
});
