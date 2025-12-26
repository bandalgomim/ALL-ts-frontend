import React, { useState, useContext, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LeagueCalendar from '@components/calendar/LeagueCalendar';
import LeagueHeader from '@components/league/leagueHeader';
import { hookLeague } from '@hooks/league.hook';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingScreen from '@components/loadingPage';
import { getLeagueReqQueryDto, getLeagueResDto } from '@model/league.dto';
import MainTabBar from '@components/main/mainTabBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '@model/navigation.dto';
import { HeadNotch } from '@components/notch';
import { useLeagueState, useLeagueActions } from '@context/league.context';
import { height, width } from '@/global';
import Logo from '@components/logo';
import { hookRefetch } from '@hooks/refetch.hook';
import { hookIsLogin } from '@hooks/IAM.hook';
import { PostState } from '@model/config';

const LeagueScreen = () => {
  
  const { setLeagueRes } = useLeagueActions();
  const leagueRes = useLeagueState() as PostState<getLeagueResDto>;
  console.log('LeagueScreen 렌더링,', leagueRes.loading);
  //console.log('LeagueScreen 렌더링,', leagueRes.loading);
  const { leagueId } = useRoute().params as getLeagueReqQueryDto;

  const refetch = useCallback(() => {
    return hookLeague('GET' as string, {leagueId: leagueId}, setLeagueRes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId, setLeagueRes]);
  hookRefetch(refetch, setLeagueRes);


  return leagueRes.loading ? (
    <LoadingScreen
      color="blue"
    />
  ) : (
    <View style={styles.Container}>
      <HeadNotch/>
      <LeagueHeader refetch={refetch} data={leagueRes.data}/>
      <LeagueCalendar data={leagueRes.data}/>
      <View style={[styles.absolutePosition, styles.tabBar]}>
        <MainTabBar
          color="blue"
        />
      </View>
      <View style={[styles.absolutePosition, styles.logo]}>
        <Logo color={'blue'} />
        <View>
          <Text style={styles.sloganText}>All  Sports  Scheduler</Text>
        </View>
      </View>
      {console.log('Rendering LeagueScreen')}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  // 공통 absolute 포지션 스타일
  absolutePosition: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  tabBar: {
    bottom: 0,
    zIndex: 1000,
  },
  logo: {
    zIndex: -1,
    left: width * 0.05,
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
LeagueScreen.whyDidYouRender = true;