import React, { useCallback, useContext, useEffect, useState } from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import MainCalendar from '../components/calendar/MainCalendar';
import Logo from '../components/logo';
import { useMain } from '../hooks/main.hook';

import { MainHeader } from '../components/main/mainHeader';
import LoadingScreen  from '../components/loadingPage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '../model/navigation.dto';
import { width, height } from '../global';
import { HeadNotch } from '../components/notch';
import { MainContext } from '../context/main.context';
import { AuthContext } from '../context/auth.context';

const MainScreen = () => {
  const {mainRes} = useContext(MainContext);
  const {login } = useContext(AuthContext);
  useMain('GET', null);

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);

  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();
  const navigateIAM = useCallback(() => {
    navigationIAM.navigate('IAMScreen', undefined);
  }, [navigationIAM]); // navigationTeam을 의존성 배열에 추가
  useEffect(() => {
    if (login === false) {
      navigateIAM();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  useEffect(() => {
    if (prevLoading === true && mainRes.loading === false) {
      setRender(true);
    }
    setPrevLoading(mainRes.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainRes.loading]);

  return !render ? (
    <LoadingScreen
    color="blue"
    />
  ) : (
    <View style={styles.Container}>
      <HeadNotch/>
      <MainHeader/>
      <MainCalendar
        data={mainRes.data}
      />
      <View style={[styles.logo, {bottom: height * 0.06}]}>
        <Logo
          color="white"
        />
      </View>
      <View style={[styles.banner,{width: width * 0.85, height: height * 0.06, marginTop: height * 0.173}]}>
        <Text style={[styles.bannerText,{fontSize: width * 0.07}]}>advertisement banner</Text>
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
  logo: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  banner: {
    backgroundColor: '#b1b4cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
});

MainScreen.whyDidYouRender = true;
export default React.memo(MainScreen);
