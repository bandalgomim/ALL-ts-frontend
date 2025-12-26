import React, { useCallback, useEffect } from 'react';
import Match from '@components/match/match';
import { useNavigation, useRoute } from '@react-navigation/native';
import { hookMatch } from '@hooks/match.hook';
import LoadingScreen from '@components/loadingPage';
import { View, StyleSheet } from 'react-native';
import MainTabBar from '@components/main/mainTabBar';
import { getMatchResDto, getMatchResQueryDto } from '@model/match.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '@model/navigation.dto';
import { useMatchState, useMatchActions } from '@context/match.context';
import { hookRefetch } from '@hooks/refetch.hook';
import { hookIsLogin } from '@hooks/IAM.hook';
import { PostState } from '@model/config';

const MatchScreen = () => {

  const { setMatchRes } = useMatchActions();
  const matchRes = useMatchState() as PostState<getMatchResDto>;
  const { matchId } = useRoute().params as getMatchResQueryDto;
  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();

  const navigateIAM = useCallback(() => {
    navigationIAM.replace('IAMScreen', {state: true});
  }, [navigationIAM]);
  const refetch = useCallback(() => {
    return hookMatch('GET', { matchId }, setMatchRes);
  }, [matchId, setMatchRes]);
  hookRefetch(refetch, setMatchRes);
  useEffect(() => {
    hookIsLogin(navigateIAM);
  }, [navigateIAM]);

  return matchRes.loading ? (
    <LoadingScreen
      color="white"
    />
  ) : (
    <View style={styles.rootContainer}>
      <Match
        match={matchRes.data as getMatchResDto ?? {}}
        refetch={refetch}
      />
      <View style={styles.container}>
        <MainTabBar
          color="white"
        />
      </View>
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    zIndex: 0,
  },
});

