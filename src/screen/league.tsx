import React, { useState, useContext, useEffect, useCallback } from 'react';
import {  StyleSheet, View } from 'react-native';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import LeagueHeader from '../components/league/leagueHeader';
import LeageTeamListBar from '../components/league/leageTeamList';
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

const LeagueScreen = () => {
  const {leagueRes, setLeagueRes} = useContext(LeagueContext);
  const {login, setLogin} = useContext(AuthContext);
  const { leagueId, key } = useRoute().params as getLeagueReqQueryDto;
  useEffect(() => {
      setRender(false);
      hookLeague('GET' as string, {leagueId: leagueId}, setLeagueRes, setLogin);
  }, [leagueId, key]);

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

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (prevLoading === true && leagueRes.loading === false) {
      setRender(true);
    }
    setPrevLoading(leagueRes.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueRes.loading]);

  return !render ? (
    <LoadingScreen
      color="blue"
    />
  ) : (
    <View style={styles.Container}>
      <HeadNotch/>
      <LeagueHeader/>
      <LeageTeamListBar/>
      <LeagueCalendar/>
      <View style={[styles.tabBar]}>
        <MainTabBar
          color="blue"
        />
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
});

export default React.memo(LeagueScreen);
