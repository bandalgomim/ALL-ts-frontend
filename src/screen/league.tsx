import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import { MatchBar } from '../components/matchBar/matchBar';
import LeagueHeader from '../components/league/leagueHeader';
import { LeageTeamListBar } from '../components/league/leageTeamList';
import { Logo } from '../components/logo';
import { ApiContext } from '../context/context';
import { useLeague } from '../hooks/league.hook';
import { matchDto } from '../model/main.dto';
import { useRoute } from '@react-navigation/native';


export const LeagueScreen = () => {
  const { height } = Dimensions.get('window');
  const {leagueRes, setLeagueRes, leagueReq} = useContext(ApiContext);
  const route = useRoute();
  useEffect(() => {
    if (route.params && 'leagueId' in route.params) {
      setLeagueRes({
        method: 'GET',
        data: {leagueId: Number(route.params.leagueId)},
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);
  useLeague(leagueRes.method as string, leagueRes.data);

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (prevLoading === true && leagueReq.loading === false) {
      setRender(true);
    }
    setPrevLoading(leagueReq.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueReq.loading]);

  return !render ? (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  ) : (
        <View style={styles.Container}>
          <LeagueHeader/>
          <LeageTeamListBar/>
          <LeagueCalendar/>
          <ScrollView style={{marginTop: -height * 0.01}}>
            {leagueReq?.data?.matchList?.map((match: matchDto, index: number) => {
              return (
                <MatchBar
                  isVisible={null}
                  setIsVisible={null}
                  key={index}
                  match={match}
                  color={'blue'}
                />
              );
            })}
          </ScrollView>
          <View style={[styles.logo, {bottom: -height * 0.03}]}>
            <Logo
              color="blue"
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
});
