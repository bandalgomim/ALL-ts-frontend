import React, { useState } from 'react';
import { View, Text, StyleSheet,  ImageBackground, TouchableOpacity } from 'react-native';
import { matchDto } from '../../model/main.dto';
import MatchScore  from './matchScore';
import IsSelected from '../isSelected';
import TeamOrLeagueLogo  from '../teamOrLeagueLogo';
import { useNavigation } from '@react-navigation/native';
import { MatchPageParamList } from '../../model/navigation.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '../../global';

interface MatchBarPros {
    match: matchDto;  // Assuming match is your interface from earlier
    color: string;
    isVisible: boolean | null;
    setIsVisible: ((isVisible: boolean) => void) | null
}

const MatchBar: React.FC<MatchBarPros> = ({match, color, isVisible, setIsVisible}) => {
  
  
  const [score, setScore] = useState(false);
  const style = color === 'white'
    ? [styles.stateTextWhite, styles.teamNameWhite]
    : [styles.stateTextBlue, styles.teamNameBlue];
  const onPressScore = () => {
    setScore(!score);
  };
  const navigationMatch = useNavigation<StackNavigationProp<MatchPageParamList>>();
  const navigateMatch = (matchId: number) => {
    navigationMatch.replace('MatchScreen', { matchId: matchId });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={()=> navigateMatch(match.matchId)}
    >
      <View style={[styles.matchBarContainer, {height:height * 0.1, width: width * 0.93 + 6}]}>
        <ImageBackground
          resizeMode="contain"
          source={color === 'white'
            ? require('../../assets/match/bar/matchBar_w.png')
            : require('../../assets/match/bar/matchBar_b.png')}
          style={[styles.matchBar, { height:height * 0.1, width:width * 0.93}]}
        >
          <View style={[styles.matchBar, {width:width * 0.93, marginTop: -height * 0.007}]}>
            <View style={[styles.state, { width:width * 0.22, height:height * 0.054, marginRight: -width * 0.05, marginLeft: -width * 0.01}]}>
              <Text style={[style[0], {width: width * 0.21, fontSize: width * 0.05, marginLeft:width * 0.02, marginBottom:-height * 0.005, marginTop:-height * 0.007}]}>
                {match.matchDate ? `${match.matchDate.slice(5, 7)}/${match.matchDate.slice(8, 10)}` : '0000'}
              </Text>
              <Text style={[style[0], {width: width * 0.21, fontSize: width * 0.075}, {color : match.matchState === 'live' ? '#EA5579' : style[0].color} ]}>{`${match.matchState}`}</Text>
            </View>
            <View style={{marginRight: width * 0.01, width: width * 0.132, borderWidth: 0 }}>
              <Text style={[style[1], {fontSize: width * 0.08, textAlign: 'right'}]}>
                {`${match.homeTeamInit}`}
              </Text>
            </View>
            <TeamOrLeagueLogo
              logo={match.hometeamLogo}
              type={'small'}
            />
            <TouchableOpacity
              style={[styles.matchBar, {marginLeft: width * 0.015, marginRight: width * 0.015}]}
              onPress={onPressScore}
            >
              <MatchScore
                score={score === true ? match.homeTeamScore : '?'}
                color={color}
                type={'small'}
              />
              <Text style={[style[1], {fontSize:width * 0.0745, margin: -width * 0.01, marginTop: -height * 0.01}]}> : </Text>
              <MatchScore
                score={score === true ? match.awayTeamScore : '?'}
                color={color}
                type={'small'}
              />
            </TouchableOpacity>
            <TeamOrLeagueLogo
              logo={match.awayteamLogo}
              type={'small'}
            />
            <View style={{marginRight: -width * 0.015, marginLeft: width * 0.01, width: width * 0.132  }}>
              <Text style={[style[1], {fontSize:width * 0.08, textAlign: 'left'}]}>
                {`${match.awayTeamInit}`}
              </Text>
            </View>
            <IsSelected
               isSelected={match.isMatchSelected}
               teamId={null}
               leagueId={null}
               matchId={match.matchId}
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
    justifyContent: 'flex-start',
  },
  matchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  state: {
    alignItems: 'center',
  },
  stateTextBlue: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  teamNameBlue: {
    fontFamily: 'sb-it-ver1',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  stateTextWhite: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  teamNameWhite: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
});

export default React.memo(MatchBar);