import React, { useState, useContext, useEffect, useCallback } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import LeagueHeader from '../components/league/leagueHeader';
import { hookLeague } from '../hooks/league.hook';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingScreen  from '../components/loadingPage';
import { getLeagueReqQueryDto } from '../model/league.dto';
import MainTabBar from '../components/main/mainTabBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '../model/navigation.dto';
import { HeadNotch } from '../components/notch';
import { AuthContext } from '../context/auth.context';
import { LeagueContext } from '../context/league.context';
import { height, width } from '../global';
import Logo from '../components/logo';
import { hookRefetch } from '../hooks/refetch.hook';
import { localData } from '../IAM/localData';
import { hookIsLogin } from '../hooks/IAM.hook';

const LeagueScreen = () => {
  const { leagueRes, setLeagueRes } = useContext(LeagueContext);
  const { leagueId } = useRoute().params as getLeagueReqQueryDto;
  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();

  const navigateIAM = useCallback(() => {
    navigationIAM.navigate('IAMScreen', {state: true});
  }, [navigationIAM]);
  const refetch = useCallback(() => {
    setRender(false);
    return hookLeague('GET' as string, {leagueId: leagueId}, setLeagueRes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId, setLeagueRes]);
  hookRefetch(refetch);

  useEffect(() => {
    hookIsLogin(navigateIAM)
  }, []);

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (prevLoading === true && leagueRes.loading === false) {
      setRender(true);
    }
    setPrevLoading(leagueRes.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueRes.loading]);

  /*useFocusEffect(
    useCallback(() => {
      if (login === false) {return;}
      setRender(false);
      hookLeague('GET' as string, {leagueId: leagueId}, setLeagueRes, setLogin);
      return () => {};
    }, [login, leagueId, key, setLeagueRes, setLogin])
  );*/

  return !render ? (
    <LoadingScreen
      color="blue"
    />
  ) : (
    <View style={styles.Container}>
      <HeadNotch/>
      <LeagueHeader refetch={refetch}/>
      <LeagueCalendar/>
      <View style={[styles.tabBar]}>
        <MainTabBar
          color="blue"
        />
      </View>
      <View style={[styles.logo]}>
        <Logo color={'blue'} />
        <View>
          <Text style={styles.sloganText}>All  Sports  Scheduler</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex:1,
  },
  tabBar: {
    position: 'absolute', // 하단 고정
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  logo: {
    position: 'absolute',
    zIndex: -1,
    left: width * 0.05,
    right: 0,
    bottom: 0.07 * height,
    opacity: 0.25,
  },
  sloganText: {
    width: width,
    fontSize: width * 0.0885,
    marginLeft: width * 0.025,
    marginTop: -height * 0.045,
    color: '#EA5579',
    fontFamily: 'rg-it-ver2',
  },
});

export default React.memo(LeagueScreen);
