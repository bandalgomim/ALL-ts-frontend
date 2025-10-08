import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { matchDto } from '../../model/main.dto';
import MatchScore from './matchScore';
import IsSelected from '../isSelected';
import TeamOrLeagueLogo from '../teamOrLeagueLogo';
import { useNavigation } from '@react-navigation/native';
import { MatchPageParamList } from '../../model/navigation.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '../../global';
import { useModalActions } from '../../context/modal/modal.context.tsx';
import { ModalContext as ModalNextuseMatchActions, useModalNextMatchActions } from '../../context/modal/modalNextMatch.context';

interface MatchBarPros {
  match: matchDto; // Assuming match is your interface from earlier
  color: string;
}

const MatchBar: React.FC<MatchBarPros> = ({ match, color }) => {
  const { close: closeModal } = useModalActions(); 
  const { close: closeNextMatchModal } = useModalNextMatchActions();
  const [score, setScore] = useState(false);

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
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigateMatch(match.matchId)}>
      <View style={[styles.matchBarContainer, { height: height * 0.075, width: width * 0.93 }]}>
        <ImageBackground
          resizeMode="contain"
          source={
            color === 'white'
              ? require('../../assets/match/bar/matchBar_w-TEST.png')
              : color === 'blue'
              ? require('../../assets/match/bar/matchBar_b-TEST.png')
              : require('../../assets/match/bar/matchBar_r-TEST.png')
          }
          style={[styles.matchBar, { height: height * 0.075, width: width * 0.93 }]}
        >
          <View style={[styles.matchBar, { width: width * 0.93, marginTop: -height * 0.007 }]}>
            <View
              style={[
                styles.state,
                {
                  width: width * 0.22,
                  height: height * 0.054,
                  marginRight: -width * 0.05,
                  marginLeft: -width * 0.01,
                },
              ]}
            >
              <Text
                style={[
                  styles.stateText,
                  styleColor,
                  {
                    width: width * 0.21,
                    fontSize: width * 0.049,
                    marginLeft: width * 0.016,
                    marginBottom: -height * 0.005,
                    marginTop: -height * 0.0045,
                  },
                ]}
              >
                {match.matchDate
                  ? `${match.matchTime.slice(0, 5)}`
                  : '00:00'}
              </Text>
              <Text
                style={[
                  styles.stateText,
                  styleColor,
                  { width: width * 0.21, fontSize: width * 0.075 },
                  {
                    color: match.matchState === 'live'
                      ? (color === 'red' ? '#30397A' : '#EA5579')
                      : styleColor.color
                  },
                ]}
              >{`${match.matchState}`}</Text>
            </View>
            <View style={{ marginRight: width * 0.01, width: width * 0.132, borderWidth: 0 }}>
            <Text style={[styles.teamName, styleColor, {textAlign: 'right' }]}>{match.homeTeamInit}</Text>
            </View>
            <TeamOrLeagueLogo logo={match.hometeamLogo} type={'small'} initial={match.homeTeamInit}/>
            <TouchableOpacity
              style={[styles.matchBar, { marginLeft: width * 0.015, marginRight: width * 0.015 }]}
              onPress={onPressScore}
            >
              <MatchScore
                score={score === true ? match.homeTeamScore : '?'}
                color={color}
                type={'small'}
              />
              <Text
                style={[
                  styles.teamName,
                  styleColor,
                  { fontSize: width * 0.0745, margin: -width * 0.01, marginTop: -height * 0.01 },
                ]}
              >
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
            <View
              style={{
                marginRight: -width * 0.015,
                marginLeft: width * 0.01,
                width: width * 0.132,
              }}
            >
              <Text style={[styles.teamName, styleColor, {textAlign: 'left' }]}>{match.awayTeamInit}</Text>
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
    //justifyContent: 'flex-start',
  },
  matchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1
    //justifyContent: 'center',
  },
  state: {
    alignItems: 'center',
  },
  textWhite: {
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  textBlue: {
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  textRed: {
    color: 'white',
    textShadowColor: '#af405b', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  stateText: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
  },
  teamName: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.08,
  },
  teamNameKR: {
    fontFamily: 'NotoSansKR-ExtraBold',
    fontSize: width * 0.08,
    marginTop: height * -0.002,
  },
});

export default React.memo(MatchBar);
