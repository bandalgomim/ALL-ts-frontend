import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TeamCalendar from '@components/calendar/TeamCalendar';
import TeamHeader from '@components/teamHeader';
import { hookTeam } from '@hooks/team.hook';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingScreen  from '@components/loadingPage';
import { getTeamReqQueryDto, getTeamResDto } from '@model/team.dto';
import MainTabBar from '@components/main/mainTabBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '@model/navigation.dto';
import { HeadNotch } from '@components/notch';
import { useTeamState, useTeamActions } from '@context/team.context';
import { height, width } from '@/global';
import Logo from '@components/logo';
import { hookRefetch } from '@hooks/refetch.hook';
import { hookIsLogin } from '@hooks/IAM.hook';
import { PostState } from '@model/config';

const TeamScreen = () => {
  const {setTeamRes} = useTeamActions();
  const teamRes = useTeamState() as PostState<getTeamResDto>;
  console.log('TeamScreen 렌더링,', teamRes.loading);
  const { teamId, key } = useRoute().params as getTeamReqQueryDto;

  const refetch = useCallback(() => {
    return hookTeam('GET' as string, {teamId: teamId}, setTeamRes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, key, setTeamRes]);
  hookRefetch(refetch, setTeamRes);


  return teamRes.loading ? (
    <LoadingScreen
      color="blue"
    />
  ) : (
    <View style={styles.Container}>
      <HeadNotch/>
      <TeamHeader refetch={refetch} data={teamRes.data}/>
      <TeamCalendar data={teamRes.data}/>
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
        {console.log('Rendering TeamScreen')}
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
TeamScreen.whyDidYouRender = true;
