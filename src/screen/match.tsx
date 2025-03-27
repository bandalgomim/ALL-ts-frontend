import React, { useContext, useEffect, useState } from 'react';
import { Match } from '../components/match';
import { useRoute } from '@react-navigation/native';
import { ApiContext } from '../context/context';
import { useMatch } from '../hooks/match.hook';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const MatchScreen = () => {
  const {matchRes, setMatchRes, matchReq} = useContext(ApiContext);
  const route = useRoute();
  useEffect(() => {
    if (route.params && 'matchId' in route.params) {
      setMatchRes({
        method: 'GET',
        data: {matchId: Number(route.params.matchId)},
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);
  useMatch(matchRes.method as string, matchRes.data);

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (prevLoading === true && matchReq.loading === false) {
      setRender(true);
    }
    setPrevLoading(matchReq.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchReq.loading]);

  return !render ? (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  ) : (
    <Match
      match={matchReq.data}
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
