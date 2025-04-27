import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TeamCalendar from '../components/calendar/TeamCalendar';
import TeamHeader from '../components/teamHeader';
import { hookTeam } from '../hooks/team.hook';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingScreen  from '../components/loadingPage';
import { getTeamReqQueryDto } from '../model/team.dto';
import MainTabBar from '../components/main/mainTabBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '../model/navigation.dto';
import { HeadNotch } from '../components/notch';
import { TeamContext } from '../context/team.context';
import { AuthContext } from '../context/auth.context';

const TeamScreen = () => {
  const {teamRes, setTeamRes } = useContext(TeamContext);
  const {login, setLogin} = useContext(AuthContext);
  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  const { teamId, key } = useRoute().params as getTeamReqQueryDto;

  useEffect(() => {
      setRender(false);
      hookTeam('GET' as string, {teamId: teamId}, setTeamRes, setLogin);
  }, [teamId, key]);

  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();
  const navigateIAM = useCallback(() => {
    navigationIAM.navigate('IAMScreen', undefined);
  }, [navigationIAM]); // navigationTeam을 의존성 배열에 추가
  useEffect(() => {
    if (login === false) {
      navigateIAM();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);


  useEffect(() => {
    if (prevLoading === true && teamRes.loading === false) {
      setRender(true);
    }
    setPrevLoading(teamRes.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamRes.loading]);

  return !render ? (
    <LoadingScreen
      color="blue"
    />
  ) : (
    <View style={styles.Container}>
      <HeadNotch/>
      <TeamHeader/>
      <TeamCalendar/>
      <View style={[styles.tabBar]}>
        <MainTabBar
          color="blue"
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
    backgroundColor: '#ffffff',
    zIndex:1,
  },
  tabBar: {
    position: 'absolute', // 하단 고정
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
});
export default React.memo(TeamScreen);