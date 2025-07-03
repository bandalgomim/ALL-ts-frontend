
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getMatchReqDto, platform } from '../../model/match.dto';
import SearchBar from '../searchBar/serchBar';
import TeamOrLeagueLogo from '../teamOrLeagueLogo';
import MatchScore from '../matchBar/matchScore';
import IsSelected from '../isSelected';
import { useNavigation } from '@react-navigation/native';
import { TeamPageParamList } from '../../model/navigation.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import PlatformList from './platformList';
import { width, height } from '../../global';
import { HeadNotch } from '../notch';

interface MatchPros {
  match: getMatchReqDto;
}

const Match: React.FC<MatchPros> = ({ match }) => {
  const [homeTeamScore, setHomeTeamScore] = useState(false);
  const [awayTeamScore, setAwayTeamScore] = useState(false);
  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigateTeam = (teamId: number) => {
    navigationTeam.navigate('TeamScreen', { teamId: teamId });
  };

  const onPressHomeTeamScore = () => {
    setHomeTeamScore(!homeTeamScore);
  };
  const onPressAwayTeamScore = () => {
    setAwayTeamScore(!awayTeamScore);
  };

  function detectLang(text: string | null) {
    if (!text) {return;}
    const hasKR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
    const hasEnglish = /[a-zA-Z]/.test(text);

      if (hasKR && !hasEnglish) {
        return (<Text style={[styles.fontBlueBigKR]}>{text}</Text>);
      }
      else if (!hasKR && hasEnglish) {
        return (<Text style={[styles.fontBlueBig]}>{text}</Text>);
      } else {return;}
  }
  

  return (
    <View style={styles.container}>
      <HeadNotch />
      <View style={styles.middleContainer}>
        <SearchBar type="match" />
        <View style={styles.isSelectedContainer}>
          <IsSelected
            isSelected={match.isMatchSelected}
            teamId={null}
            leagueId={null}
            matchId={match.matchId}
          />
        </View>
        <Image
          resizeMode="contain"
          style={styles.scoreImage}
          source={require('./../../assets/match/score.png')}
        />
      </View>
      <View style={styles.teamContainer}>
        {/* Home Team */}
        <View style={styles.homeTeamContainer}>
          <TouchableOpacity onPress={() => navigateTeam(match.homeTeamId as number)}>
            <View style={styles.teamLogoContainer}>
              <TeamOrLeagueLogo logo={match?.hometeamLogo} type={'big'} />
              <View style={styles.teamInfoContainer}>
                {/* 배경 이미지를 teamInfoContainer 내부로 이동하고 absolute로 설정 */}
                <Image
                  resizeMode="contain"
                  style={styles.whiteBackground}
                  source={require('../../assets/match/white.png')}
                />
                <View style={styles.teamNameContainer}>
                  {detectLang(match.homeTeamInit)}
                </View>
                <Text style={styles.fontBlueSmall} numberOfLines={2}>
                  {`${match?.homeCountryName} ${match?.sportName}/${match?.homeLeagueName}`.length > 22
                    ? `${match?.sportName}/${match?.homeLeagueName}`
                    : `${match?.homeCountryName} ${match?.sportName}/${match?.homeLeagueName}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.scoreContainer}>
            <TouchableOpacity onPress={onPressHomeTeamScore}>
              <MatchScore
                score={homeTeamScore === true ? (match.homeTeamScore as number) : '?'}
                color={'blue'}
                type={'big'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.leftContainer}>
            <View style={styles.platformListContainer}>
              <PlatformList
                platformList={match.platform as platform[]}
                type="replay"
              />
            </View>
            <View style={styles.platformListContainer}>
              <PlatformList
                platformList={match.platform as platform[]}
                type="highlight"
              />
            </View>
          </View>
        </View>
        {/* Away Team */}
        <View style={styles.awayTeamContainer}>
          <TouchableOpacity onPress={() => navigateTeam(match.awayTeamId as number)}>
            <View style={styles.teamLogoContainer}>
              <TeamOrLeagueLogo logo={match?.awayteamLogo} type={'big'} />
              <View style={styles.teamInfoContainer}>
                <View style={styles.teamNameContainer}>
                  {detectLang(match.awayTeamInit)}
                </View>
                <Text style={styles.fontBlueSmall} numberOfLines={2}>
                  {`${match?.awayCountryName} ${match?.sportName}/${match?.awayLeagueName}`.length > 22
                    ? `${match?.sportName}/${match?.awayLeagueName}`
                    : `${match?.awayCountryName} ${match?.sportName}/${match?.awayLeagueName}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.scoreContainer}>
            <TouchableOpacity onPress={onPressAwayTeamScore}>
              <MatchScore
                score={awayTeamScore === true ? (match.awayTeamScore as number) : '?'}
                color={'white'}
                type={'big'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rightContainer}>
            <Image
              resizeMode="contain"
              style={{width: width * 0.5, height: height * 0.14, position: 'absolute', zIndex: 0, marginTop: -height * 0.026}}
              source={require('../../assets/match/blue.png')}
            />
            <Text
              style={[
                styles.fontWhiteState,
                match.matchState === 'live' && styles.fontLive,
              ]}
            >
            {match?.matchState}
            </Text>
            <View style={styles.dateContainer}>
              <Text style={styles.fontDate}>
                {match.matchDate ? match.matchDate.split("T")[0] : '0000'}
              </Text>
              <Text style={styles.fontTime}>
                {match.matchDate ? match.matchDate.split("T")[1].slice(0, 8) : '0000'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  middleContainer: {
    height: 0,
    alignItems: 'center',
    top: 0,
    zIndex: 0,
  },
  isSelectedContainer: {
    width: width * 0.07,
    height: width * 0.07,
    marginTop: -height * 0.03,
    marginLeft: width * 0.77,
  },
  scoreImage: {
    width: width * 0.3,
    marginTop: height * 0.23,
  },
  teamContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    top: 0,
    zIndex: -1,
  },
  homeTeamContainer: {
    borderWidth: 0,
    height: height * 0.86,
    width: '50%',
    backgroundColor: '#30397A',
    flexDirection: 'column',
    alignItems: 'center',
  },
  awayTeamContainer: {
    height: height * 0.86,
    width: '50%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamLogoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
    width: width * 0.5,
  },
  teamInfoContainer: {
    alignItems: 'center',
    height: height * 0.124,
  },
  teamNameContainer: {
    height: height * 0.1,
    alignItems: 'center',
  },
  fontWhiteBig: {
    fontFamily: 'sb-it-ver1',
    color: 'white',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
    fontSize: height * 0.07,
    width: width * 0.5,
    textAlign: 'center',
  },
  fontWhiteSmall: {
    fontFamily: 'sb-it-ver1',
    color: 'white',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
    fontSize: height * 0.024,
    marginTop: -height * 0.03,
    textAlign: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    width: width * 0.5,
    marginTop: height * 0.012,
  },
  fontDate: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
    fontSize: width * 0.09,
    width: width * 0.5,
    marginLeft: width * 0.0125,
    textAlign: 'center',
  },
  fontTime: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
    fontSize: width * 0.13,
    width: width * 0.5,
    marginTop: -height * 0.014,
    marginLeft: -width * 0.0125,
    textAlign: 'center',
  },
  fontWhiteState: {
    fontFamily: 'sb-it-ver1',
    color: 'white',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
    fontSize: width * 0.2,
    width: width * 0.5,
    marginTop: -height * 0.0095,
    textAlign: 'center',
  },
  fontLive: {
    color: '#EA5579',
  },
  scoreContainer: {
    marginTop: height * 0.08,
  },

  fontBlueBig: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    fontSize: height * 0.07,
    width: width * 0.5,
    textAlign: 'center',
  },
  fontBlueBigKR: {
    fontFamily: 'NotoSansKR-ExtraBold',
    transform: [{ scaleY: 1 }],
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    fontSize: height * 0.05,
    width: width * 0.5,
    textAlign: 'center',
    marginTop: -height * 0.034,
  },
  fontBlueSmall: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    fontSize: height * 0.024,
    marginTop: -height * 0.03,
    textAlign: 'center',
  },
  leftContainer: {
    alignItems: 'center',
    width: width * 0.5,
    height: height * 0.25,
    marginTop: height * 0.03,
  },
  platformListContainer: {
    alignItems: 'center',
    width: width * 0.5,
    height: height * 0.1,
  },
  rightContainer: {
    alignItems: 'center',
    width: width * 0.5,
    marginTop: height * 0.012,
  },
  onAirText: {
    width: width * 0.4,
    fontFamily: 'sb-it-ver1',
    color: '#EA5579',
    textAlign: 'left',
    fontSize: width * 0.06,
  },
  platformContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: width * 0.5,
    marginTop: height * 0.03,
  },
  whiteBackground: {
    width: width * 0.63,
    height: height * 0.125,
    position: 'absolute',
    zIndex: -1,
  },
});

export default React.memo(Match);