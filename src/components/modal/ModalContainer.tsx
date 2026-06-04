import React from 'react';
import { View, StyleSheet } from 'react-native';
import MatchModal from '@components/modal/MatchModal';
import SearchModal from '@components/modal/searchModal';
import NextMatchModal from '@components/modal/nextMatchModal';
import LogoModal from '@components/modal/logoModal';

const ModalContainer = () => {
  return (
    <View style={styles.container}>
      <MatchModal />
      <SearchModal />
      <NextMatchModal />
      <LogoModal/>

    </View>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  container: {
    height: 0, // 헤더 자체는 안 보이게
    width: 0,
    position: 'absolute', // 모달 위치 제어에 영향 없도록
  },
});
