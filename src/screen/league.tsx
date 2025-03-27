import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, InteractionManager, ScrollView, StyleSheet, View } from 'react-native';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import { MatchBar } from '../components/matchBar/matchBar';
import LeagueHeader from '../components/leagueHeader';
import { LeageTeamListBar } from '../components/leageTeamList';
import { Logo } from '../components/logo';
import { ApiContext } from '../context/context';
import { getLeagueReqDto } from '../model/league.dto';
import { useLeague } from '../hooks/league.hook';
import { match } from '../model/main.dto'
import { useRoute } from '@react-navigation/native';


export const LeagueScreen = () => {
  const { width, height } = Dimensions.get('window');
  const {league} = useContext(ApiContext);
  const route = useRoute();
  const [leagueState, setLeagueState] = useState<getLeagueReqDto>({
    method: 'GET',
    data: null,
  });

  useEffect(() => {
    if (route.params && 'leagueId' in route.params) {
      setLeagueState({
        method: 'GET',
        data: {leagueId: Number(route.params.leagueId)},
      });
    }
  }, [route.params]);

  useLeague(leagueState.method, leagueState.data);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (!league.loading) {
      InteractionManager.runAfterInteractions(() => {
        setIsReady(true);
      });
    }
  }, [league.loading]);

  return !isReady ? (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  ) : (
        <View style={styles.Container}>
          <LeagueHeader/>
          <LeageTeamListBar/>
          <LeagueCalendar/>
          <ScrollView style={{marginTop: -height*0.01}}>
            {league?.data?.matchList?.map((match: match, index: number) => {
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
          <View style={[styles.logo, {bottom: -height*0.03}]}>
            <Logo
              color="blue"
            />
          </View>
        </View>
      );
}

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
    zIndex:1
  },
  logo: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: -1, // B 요소 뒤로 보냄
  }
});