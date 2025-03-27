import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import TeamCalendar from '../components/calendar/TeamCalendar';
import { MatchBar } from '../components/matchBar/matchBar';
import TeamHeader from '../components/teamHeader';
import { Logo } from '../components/logo';
import { ApiContext } from '../context/context';
import { useTeam } from '../hooks/team.hook';
import { getTeamReqDto } from '../model/team.dto';
import { match } from '../model/main.dto'
import { useRoute } from '@react-navigation/native';

export const TeamScreen = () => {
  const {team} = useContext(ApiContext);
  const route = useRoute();
  const [teamState, setTeamState] = useState<getTeamReqDto>({
    method: 'GET',
    data: null,
  });
  useEffect(() => {
    if (route.params && 'teamId' in route.params) {
      setTeamState({
        method: 'GET',
        data: {teamId: Number(route.params.teamId)},
      });
    }
  }, [route.params]);
  useTeam(teamState.method, teamState.data);
  const { width, height } = Dimensions.get('window');
    return team.loading ? (
      <View style={styles.LoadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    ) : (
      <View style={styles.Container}>
        <TeamHeader/>
        <TeamCalendar/>
        <ScrollView>
          {team?.data?.matchList?.map((match: match, index: number) => {
            return (
              <MatchBar
                isVisible={null}
                setIsVisible={null}
                key={index}
                match={match}
                color={'white'}
              />
            );
          })}
        </ScrollView>
        <View style={[styles.logo, {bottom: -height*0.03}]}>
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
    alignItems: 'center',
    backgroundColor: '#30397A',
    zIndex:1
  },
  logo: {
    position: 'absolute',
    zIndex: -1, // B 요소 뒤로 보냄
    flexDirection: 'row',
    justifyContent: 'flex-start',  // 가로 방향 중�� 정��
    alignItems: 'flex-end',
  },
});

