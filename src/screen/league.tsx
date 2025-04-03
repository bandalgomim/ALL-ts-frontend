import React, { useState, useContext, useEffect, useCallback } from 'react';
import {  StyleSheet, View } from 'react-native';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import LeagueHeader from '../components/league/leagueHeader';
import LeageTeamListBar from '../components/league/leageTeamList';
import Logo from '../components/logo';
import { ApiContext } from '../context/context';
import { useLeague } from '../hooks/league.hook';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingScreen  from '../components/loadingPage';
import MatchList from '../components/matchBar/matchList';
import { getLeagueReqQueryDto } from '../model/league.dto';
import MainTabBar from '../components/main/mainTabBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '../model/navigation.dto';
import { height } from '../global';

const LeagueScreen = () => {
  const {leagueRes, login} = useContext(ApiContext);
  const { leagueId } = useRoute().params as getLeagueReqQueryDto;
  useLeague('GET' as string, {leagueId : leagueId});

  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();
  const navigateIAM = useCallback(() => {
    navigationIAM.replace('IAMScreen', undefined);
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
      <LeagueHeader/>
      <LeageTeamListBar/>
      <LeagueCalendar/>
      <MatchList
        matchList={leagueRes.data.matchList}
        color={'blue'}
      />
      <View style={[styles.logo, {bottom: height * 0.06}]}>
        <Logo
          color="blue"
        />
      </View>
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
  logo: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: -1, // B 요소 뒤로 보냄
  },
  tabBar: {
    zIndex: -1,
  },
});

export default React.memo(LeagueScreen);
