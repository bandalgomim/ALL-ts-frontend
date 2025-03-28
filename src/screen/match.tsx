import React, { useContext, useEffect, useState } from 'react';
import { Match } from '../components/match';
import { useRoute } from '@react-navigation/native';
import { ApiContext } from '../context/context';
import { useMatch } from '../hooks/match.hook';
import { LoadingScreen } from '../components/loadingPage';

export const MatchScreen = () => {
  const {matchRes, setMatchRes, matchReq} = useContext(ApiContext);
  const route = useRoute();
  useEffect(() => {
    if (route.params && 'matchId' in route.params && route.params.matchId !== matchRes.data?.matchId) {
      console.log(route.params.matchId, matchRes.data?.matchId, "11111111111111111111111111111111111");
      setMatchRes({
        method: 'GET',
        data: {matchId: Number(route.params.matchId)},
      });
    } else {
      console.log(route.params, matchRes.data?.matchId, "222222222222222222222222222222");
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
    <LoadingScreen
      color='white'
    />
  ) : (
    <Match
      match={matchReq.data}
    />
    );
  };


