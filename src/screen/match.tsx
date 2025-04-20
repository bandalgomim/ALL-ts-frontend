import React, { useCallback, useContext, useEffect, useState } from 'react';
import Match  from '../components/match/match';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMatch } from '../hooks/match.hook';
import LoadingScreen  from '../components/loadingPage';
import { View, StyleSheet } from 'react-native';
import MainTabBar from '../components/main/mainTabBar';
import { getMatchResQueryDto } from '../model/match.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '../model/navigation.dto';
import { HeadNotch } from '../components/notch';
import { AuthContext } from '../context/auth.context';
import { MatchContext } from '../context/match.context';


const MatchScreen = () => {

  const {matchRes} = useContext(MatchContext);
  const {login } = useContext(AuthContext);
  const { matchId } = useRoute().params as getMatchResQueryDto;
  useMatch('GET', {matchId : matchId});

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
    <View style={[styles.logo]}>
      
    <Match
      match={matchRes.data ?? {}}
    />
    </View>
    <View style={[styles.container]}>
      <MainTabBar
        color="white"
      />
    </View>
    </>
    );
  };
  
  MatchScreen.whyDidYouRender = true;
  export default MatchScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,  // MainTabBar가 화면에 꽉 차게 확장
      position: 'absolute', // 절대 위치를 사용하여 화면 상단에 배치
      bottom: 0, // 화면 하단에 고정
      left: 0,
      right: 0,
      zIndex: 1,  // MainTabBar가 다른 요소 위에 표시되도록 설정
      backgroundColor: 'transparent', // 배경색을 투명으로 설정하여 위에 요소들이 보이게
    },
    logo: {
      flex: 1,  // Match 컴포넌트가 화면의 나머지 공간을 차지하도록 설정
      zIndex: 0, // 다른 요소보다 뒤에 표시되도록 설정
    },
  });
