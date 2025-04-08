import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TeamCalendar from '../components/calendar/TeamCalendar';
import TeamHeader from '../components/teamHeader';
import Logo from '../components/logo';
import { ApiContext } from '../context/context';
import { useTeam } from '../hooks/team.hook';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingScreen  from '../components/loadingPage';
import MatchList from '../components/matchBar/matchList';
import { getTeamReqQueryDto } from '../model/team.dto';
import MainTabBar from '../components/main/mainTabBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '../model/navigation.dto';
import { height } from '../global';
import { HeadNotch } from '../components/notch';

export const TeamScreen = () => {
  const {teamRes, login} = useContext(ApiContext);
  const { teamId } = useRoute().params as getTeamReqQueryDto;
  useTeam('GET' as string, {teamId: teamId});

  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();
  const navigateIAM = useCallback(() => {
    navigationIAM.replace('IAMScreen', undefined);
  }, [navigationIAM]); // navigationTeam을 의존성 배열에 추가
  useEffect(() => {
    if (login === false) {
      navigateIAM();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (prevLoading === true && teamRes.loading === false) {
      setRender(true);
    }
    setPrevLoading(teamRes.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamRes.loading]);

  return !render ? (
    <LoadingScreen
      color="white"
    />
  ) : (
    <View style={styles.Container}>
      <HeadNotch/>
      <TeamHeader/>
      <TeamCalendar/>
      <MatchList
        matchList={teamRes.data.matchList ?? {}}
        color={'white'}
      />
      <View style={[styles.logo, {bottom: height * 0.06}]}>
        <Logo
          color="white"
        />
      </View>
      <View>
        <MainTabBar
          color="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#30397A',
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
