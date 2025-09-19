import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
import { height, width } from '../global';
import Logo from '../components/logo';
import { hookRefetch } from '../hooks/refetch.hook';
import { hookIsLogin } from '../hooks/IAM.hook';

const TeamScreen = () => {
  const { teamRes, setTeamRes } = useContext(TeamContext);
  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  const { teamId, key } = useRoute().params as getTeamReqQueryDto;
  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();

  const navigateIAM = useCallback(() => {
    navigationIAM.navigate('IAMScreen', {state: true});
  }, [navigationIAM]); // navigationTeam을 의존성 배열에 추가
  const refetch = useCallback(() => {
    setRender(false);
    return hookTeam('GET' as string, {teamId: teamId}, setTeamRes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, key, setTeamRes]);
  hookRefetch(refetch);
  useEffect(() => {
    hookIsLogin(navigateIAM)
  }, []);


  useEffect(() => {
    if (prevLoading === true && teamRes.loading === false) {
      setRender(true);
    }
    setPrevLoading(teamRes.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamRes.loading]);

  /*useFocusEffect(
    useCallback(() => {
      if (login === false) return;
      setRender(false);
      hookTeam('GET' as string, {teamId: teamId}, setTeamRes, setLogin);
      return () => {};
    }, [login, teamId, key, setTeamRes, setLogin])
  );*/

  return !render ? (
    <LoadingScreen
      color="blue"
    />
  ) : (
    <View style={styles.Container}>
      <HeadNotch/>
      <TeamHeader refetch={refetch}/>
      <TeamCalendar/>
      <View style={[styles.tabBar]}>
        <MainTabBar
          color="blue"
        />
      </View>
        <View style={[
          styles.logo,
        ]}>
          <Logo color={'blue'}/>
          <View>
            <Text style={styles.sloganText}>All  Sports  Scheduler</Text>
          </View>
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
  logo: {
    position: 'absolute',
    left: width * 0.06,
    right: 0,
    bottom: height * 0.07,
    zIndex: -1,
    opacity: 0.25,
  },
  sloganText: {
    width: width,
    fontSize: width * 0.0885,
    marginLeft: width * 0.025,
    marginTop: -height * 0.045,
    color: '#EA5579',
    fontFamily: 'rg-it-ver2',
  },
});
export default React.memo(TeamScreen);
