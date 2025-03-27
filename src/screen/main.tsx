import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, InteractionManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainCalendar from '../components/calendar/MainCalendar';
import { Logo } from '../components/logo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Shadow } from 'react-native-shadow-2';
import { useMain } from '../hooks/main.hook';
import { ApiContext } from '../context/context';
import { MainHeader } from '../components/main/mainHeader';

export const MainScreen = () => {
  const { width, height } = Dimensions.get('window');
  const {mainRes, setMainRes, mainReq} = useContext(ApiContext);
  useEffect(() => {
    setMainRes({
      method: 'GET',
      data: null,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useMain(mainRes.method as string, mainRes.data);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (!mainReq.loading) {
      InteractionManager.runAfterInteractions(() => {
        setIsReady(true);
      });
    }
  }, [mainReq.loading]);


  return !isReady ? (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  ) : (
    <View style={styles.Container}>
      <MainHeader/>
      <MainCalendar/>
      <View style={[styles.logo, {bottom: -height * 0.03}]}>
        <Logo
          color="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  Container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#30397A',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',   // 가로 배치
    justifyContent: 'space-between',  // 양 끝 정렬
    alignItems: 'center',   // 수직 정렬 (선택 사항)
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  ShadowContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  menuBar: {
    backgroundColor: '#30397A',
  },
  myPage: {
  },
  myPageText: {
    color: 'white',
    fontFamily: '',
  },
  logo: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});
