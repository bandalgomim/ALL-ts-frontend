import React, { useContext, useEffect, useMemo, useState } from 'react';
import Match  from '../components/match';
import { useRoute } from '@react-navigation/native';
import { ApiContext } from '../context/context';
import { useMatch } from '../hooks/match.hook';
import LoadingScreen  from '../components/loadingPage';
import { View } from 'react-native';
import MainTabBar from '../components/main/mainTabBar';


const MatchScreen = () => {

  const {matchRes} = useContext(ApiContext);
  const route = useRoute();
  const matchId = route.params && 'matchId' in route.params ? route.params.matchId : null;
  useMatch('GET', {matchId : matchId as number});
  const memoizedMatchData = useMemo(() => matchRes.data, [matchRes.data]);

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (prevLoading === true && matchRes.loading === false) {
      setRender(true);
    }
    setPrevLoading(matchRes.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchRes.loading]);

  return !render ? (
    <LoadingScreen
      color="white"
    />
  ) : (
    <>
    <Match
      match={memoizedMatchData}
    />
    <View>
      <MainTabBar/>
    </View>
    </>
    );
  };
  export default MatchScreen;

