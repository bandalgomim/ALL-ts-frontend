
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ApiContext } from '../context/context';
import { useTeam } from '../hooks/team.hook';
import { getTeamReqDto, getTeamResDto } from '../model/team.dto';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { TeamPageParamList } from '../model/navigation.dto';
import { PostState } from '../model/config';

export const LoadingTeamScreen = () => {
  const {teamReq, setTeamReq} = useContext(ApiContext);
  const route = useRoute();
  setTeamReq((prev:PostState<getTeamResDto>) => ({ ...prev, loading: 'pending' }));
  const [teamState, setTeamState] = useState<getTeamReqDto>({
    method: 'GET',
    data: null,
  });
  const navigationTeam = useNavigation<NavigationProp<TeamPageParamList>>();
  const navigateTeam = (teamId: number) => {
    navigationTeam.navigate('TeamScreen', { teamId: teamId });
  };

  useEffect(() => {
    if(teamReq.loading === 'pending' && route.params && 'teamId' in route.params) {
        setTeamState({
            method: 'GET',
            data: {teamId: Number(route.params.teamId)},
          });
    } else if(teamReq.loading === 'false' && route.params && 'teamId' in route.params && teamReq.data.team.teamId === route.params.teamId){
        navigateTeam(route.params.teamId as number);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamReq, route.params]);

  useTeam(teamState.method as string, teamState.data);
    return (
      <View style={styles.LoadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
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
});
