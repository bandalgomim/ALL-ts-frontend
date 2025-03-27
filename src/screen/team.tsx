import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import TeamCalendar from '../components/calendar/TeamCalendar';
import { MatchBar } from '../components/matchBar/matchBar';
import TeamHeader from '../components/teamHeader';
import { Logo } from '../components/logo';
import { ApiContext } from '../context/context';
import { useTeam } from '../hooks/team.hook';
import { matchDto } from '../model/main.dto';
import { useRoute } from '@react-navigation/native';

export const TeamScreen = () => {
  const { height } = Dimensions.get('window');
  const {teamRes, setTeamRes, teamReq} = useContext(ApiContext);
  const route = useRoute();
  useEffect(() => {
    if (route.params && 'teamId' in route.params) {
      setTeamRes({
        method: 'GET',
        data: {teamId: Number(route.params.teamId)},
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);
  useTeam(teamRes.method as string, teamRes.data);

  const [prevLoading, setPrevLoading] = useState<boolean | null>(null); // 이전 로딩 상태
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (prevLoading === true && teamReq.loading === false) {
      setRender(true);
    }
    setPrevLoading(teamReq.loading); // 이전 상태 업데이트
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamReq.loading]);

  return !render ? (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  ) : (
    <View style={styles.Container}>
      <TeamHeader/>
      <TeamCalendar/>
      <ScrollView>
        {teamReq?.data?.matchList?.map((match: matchDto, index: number) => {
          return (
            <MatchBar
              isVisible={null}
              setIsVisible={null}
              key={index}
              match={match}
              color={'white'}
            />
          );
        })}
      </ScrollView>
      <View style={[styles.logo, {bottom: -height * 0.03}]}>
        <Logo
          color="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
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
    zIndex: -1, // B 요소 뒤로 보냄
    flexDirection: 'row',
    justifyContent: 'flex-start',  // 가로 방향 중�� 정��
    alignItems: 'flex-end',
  },
});
