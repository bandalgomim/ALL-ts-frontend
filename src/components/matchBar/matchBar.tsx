import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { matchDto } from '@model/main.dto';
import MatchScore from './matchScore';
import IsSelected from '@components/isSelected';
import TeamOrLeagueLogo from '@components/teamOrLeagueLogo';
import { useNavigation } from '@react-navigation/native';
import { MatchPageParamList } from '@model/navigation.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '@/global';
import { useModalActions } from '@context/modal/modal.context';
import { ModalContext as ModalNextuseMatchActions, useModalNextMatchActions } from '@context/modal/modalNextMatch.context';

interface MatchBarPros {
  match: matchDto; // Assuming match is your interface from earlier
  color: string;
  scoreState: boolean
}

const MatchBar: React.FC<MatchBarPros> = ({ match, color, scoreState }) => {
  const { close: closeModal } = useModalActions(); 
  const { close: closeNextMatchModal } = useModalNextMatchActions();
  const [score, setScore] = useState(scoreState);
  useEffect(() => {
    // 알림 초기화
    setScore(scoreState);
  }, [scoreState]);

  const styleColor =
    color === 'white'
      ? styles.textBlue
      : color === 'blue'
      ? styles.textWhite
      : styles.textRed;


  const onPressScore = () => {
    setScore(!score);
  };
  const navigationMatch = useNavigation<StackNavigationProp<MatchPageParamList>>();

  const navigateMatch = (matchId: string) => {
    closeModal(); // 모달 닫기
    closeNextMatchModal(); // 다음 경기 모달 닫기
    navigationMatch.navigate('MatchScreen', { matchId: matchId });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigateMatch(match.matchId)}>
      <View style={[styles.matchBarContainer, styles.matchBarSize]}>
        <ImageBackground
          resizeMode="contain"
          source={
            color === 'white'
              ? require('@assets/match/bar/matchBar_w-TEST.png')
              : color === 'blue'
              ? require('@assets/match/bar/matchBar_b-TEST.png')
              : require('@assets/match/bar/matchBar_r-TEST.png')
          }
          style={[styles.matchBar, styles.matchBarSize]}
        >
          <View style={[styles.matchBar, styles.matchBarInnerWidth]}>
            <View style={[styles.state, styles.stateSize]}>
              <Text style={[styles.stateText, styleColor, styles.stateTimeText]}>
                {match.matchDate
                  ? `${match.matchTime.slice(0, 5)}`
                  : '00:00'}
              </Text>
              <Text
                style={[
                  styles.stateText,
                  styleColor,
                  styles.stateStatusText,
                  {
                    color: match.matchState === 'live'
                      ? (color === 'red' ? '#30397A' : '#EA5579')
                      : styleColor.color
                  },
                ]}
              >{`${match.matchState}`}</Text>
            </View>
            <View style={styles.homeTeamNameContainer}>
              <Text style={[styles.teamName, styleColor, styles.textRight]}>{match.homeTeamInit}</Text>
            </View>
            <TeamOrLeagueLogo logo={match.hometeamLogo} type={'small'} initial={match.homeTeamInit}/>
            <TouchableOpacity
              style={[styles.matchBar, styles.scoreContainer]}
              onPress={onPressScore}
            >
              <MatchScore
                score={score === true ? match.homeTeamScore : '?'}
                color={color}
                type={'small'}
              />
              <Text style={[styles.teamName, styleColor, styles.scoreSeparator]}>
                {' '}
                :{' '}
              </Text>
              <MatchScore
                score={score === true ? match.awayTeamScore : '?'}
                color={color}
                type={'small'}
              />
            </TouchableOpacity>
            <TeamOrLeagueLogo logo={match.awayteamLogo} type={'small'} initial={match.awayTeamInit}/>
            <View style={styles.awayTeamNameContainer}>
              <Text style={[styles.teamName, styleColor, styles.textLeft]}>{match.awayTeamInit}</Text>
            </View>
            <IsSelected
              isSelected={match.isMatchSelected}
              teamId={null}
              leagueId={null}
              matchId={match.matchId}
              color={color}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  matchBarContainer: {
    alignItems: 'center',
  },
  matchBarSize: {
    height: height * 0.075,
    width: width * 0.93,
  },
  matchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchBarInnerWidth: {
    width: width * 0.93,
    marginTop: -height * 0.007,
  },
  state: {
    alignItems: 'center',
  },
  stateSize: {
    width: width * 0.22,
    height: height * 0.054,
    marginRight: -width * 0.05,
    marginLeft: -width * 0.01,
  },
  stateTimeText: {
    width: width * 0.21,
    fontSize: width * 0.049,
    marginLeft: width * 0.016,
    marginBottom: -height * 0.005,
    marginTop: -height * 0.0045,
  },
  stateStatusText: {
    width: width * 0.21,
    fontSize: width * 0.075,
  },
  homeTeamNameContainer: {
    marginRight: width * 0.01,
    width: width * 0.132,
    borderWidth: 0,
  },
  awayTeamNameContainer: {
    marginRight: -width * 0.015,
    marginLeft: width * 0.01,
    width: width * 0.132,
  },
  scoreContainer: {
    marginLeft: width * 0.015,
    marginRight: width * 0.015,
  },
  scoreSeparator: {
    fontSize: width * 0.0745,
    margin: -width * 0.01,
    marginTop: -height * 0.01,
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  // 공통 텍스트 그림자 베이스
  textShadowBase: {
    textShadowRadius: 3,
  },
  textWhite: {
    color: 'white',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 3 },
  },
  textBlue: {
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
  },
  textRed: {
    color: 'white',
    textShadowColor: '#af405b',
    textShadowOffset: { width: 1, height: 3 },
  },
  stateText: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
  },
  teamName: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.08,
  },
});

export default React.memo(MatchBar, (prev, next) => {
  return prev.match.matchId === next.match.matchId &&
         prev.color === next.color &&
         prev.scoreState === next.scoreState; // 🔥 이걸 꼭 추가
});
