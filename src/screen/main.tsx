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
import TeamAndLeagueListBar from '../components/main/teamAndLeagueListBar';

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
      <View style={[styles.logo]}>
        <View style={{marginLeft: width * 0.18}}>
          <Logo
            color="white"
          />
        </View>
        <View>
          <Text style={[styles.sloganText]}>All  Sports  Scheduler</Text>
        </View>
      </View>
      <View style={{marginTop: height * 0.02}}>
        <TeamAndLeagueListBar
          teamAndLeagueList={mainRes?.data?.teamAndLeagueList}
        />
      </View>
      <MainCalendar
        data={mainRes?.data}
      />
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,

    marginTop: height * -0.04,
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
  sloganText: {
    width: width,
    fontSize: width * 0.0885,
    marginTop: -height * 0.03,
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
});

MainScreen.whyDidYouRender = true;
export default React.memo(MainScreen);
