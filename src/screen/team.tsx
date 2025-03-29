import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import TeamCalendar from '../components/calendar/TeamCalendar';
import TeamHeader from '../components/teamHeader';
import Logo from '../components/logo';
import { ApiContext } from '../context/context';
import { useTeam } from '../hooks/team.hook';
import { useRoute } from '@react-navigation/native';
import LoadingScreen  from '../components/loadingPage';
import MatchList from '../components/matchBar/matchList';
import { getTeamResQueryDto } from '../model/team.dto';
import MainTabBar from '../components/main/mainTabBar';


export const TeamScreen = () => {
  const { height } = Dimensions.get('window');
  const {teamRes} = useContext(ApiContext);
  const { teamId } = useRoute().params as getTeamResQueryDto;
  useTeam('GET' as string, {teamId: teamId});

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
      <TeamHeader/>
      <TeamCalendar/>
      <MatchList
        matchList={teamRes.data.matchList}
        color={'white'}
      />
      <View style={[styles.logo, {bottom: height * 0.06}]}>
        <Logo
          color="white"
        />
      </View>
      <View>
        <MainTabBar/>
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
