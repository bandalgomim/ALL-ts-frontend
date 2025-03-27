import React, { useContext, useEffect, useState } from 'react';
import { Match } from '../components/match';
import { useRoute } from '@react-navigation/native';
import { ApiContext } from '../context/context';
import { getMatchReqDto } from '../model/match.dto';
import { useMatch } from '../hooks/match.hook';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const MatchScreen = () => {
  const {match} = useContext(ApiContext);
  const route = useRoute();
  const [matchState, setMatchState] = useState<getMatchReqDto>({
    method: 'GET',
    data: null,
  });
  useMatch(matchState.method, matchState.data);

  useEffect(() => {
    if (route.params && 'matchId' in route.params) {
      setMatchState({
        method: 'GET',
        data: {matchId: Number(route.params.matchId)},
      });
    }
  }, [route.params]);
  return match.loading ? (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  ) : (
    <Match
      match={match.data}
    />
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
