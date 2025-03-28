import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, InteractionManager, StyleSheet, View } from 'react-native';
import MainCalendar from '../components/calendar/MainCalendar';
import { Logo } from '../components/logo';
import { useMain } from '../hooks/main.hook';
import { ApiContext } from '../context/context';
import { MainHeader } from '../components/main/mainHeader';
import { LoadingScreen } from '../components/loadingPage';

export const MainScreen = () => {
  const { height } = Dimensions.get('window');
  const {mainRes, setMainRes, mainReq} = useContext(ApiContext);
  useEffect(() => {
    setMainRes({
      method: 'GET',
      data: null,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useMain(mainRes.method as string, mainRes.data);

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (prevLoading === true && mainReq.loading === false) {
      setRender(true);
    }
    setPrevLoading(mainReq.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainReq.loading]);

  return !render ? (
    <LoadingScreen
    color='blue'
    />
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
