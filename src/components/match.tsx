import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { getMatchReqDto } from '../model/match.dto';
import SearchBar from './searchBar/serchBar';
import TeamOrLeagueLogo  from './teamOrLeagueLogo';
import MatchScore  from './matchBar/matchScore';
import IsSelected from './isSelected';
import { useNavigation } from '@react-navigation/native';
import { TeamPageParamList } from '../model/navigation.dto';
import { StackNavigationProp } from '@react-navigation/stack';

interface MatchPros {
    match: getMatchReqDto
}

const Match: React.FC<MatchPros> = ({ match }) => {
  const { width, height } = Dimensions.get('window');
  const [homeTeamScore, setHomeTeamScore] = useState(false);
  const [awayTeamScore, setAwayTeamScore] = useState(false);
  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigateTeam = (teamId: number) => {
    navigationTeam.replace('TeamScreen', { teamId: teamId });
  };

  const onPressHomeTeamScore = () => {
    setHomeTeamScore(!homeTeamScore);
  };
  const onPressAwayTeamScore = () => {
    setAwayTeamScore(!awayTeamScore);
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.middleContainer, {}]}>
        <SearchBar
          type="match"
        />
        <View style={{width: width * 0.07, height: width * 0.07, marginTop: -height * 0.03, marginLeft: width * 0.77}}>
          <IsSelected
             isSelected={match.isMatchSelected}
             teamId={null}
             leagueId={null}
             matchId={match.matchId}
          />
        </View>
        <Image
          resizeMode="contain"
          style={{width: width * 0.3, marginTop: height * 0.25}}
          source={require('./../assets/match/score.png')}
        />

      </View>
      <View style={[styles.teamContainer,{}]}>
        <View style={[styles.homeTeamContainer]}>
        <TouchableOpacity onPress={()=>{navigateTeam(match.homeTeamId as number);}}>
          <View style={[styles.teamLogoContainer, {marginTop: height * 0.1, width: width * 0.5}]}>
            <TeamOrLeagueLogo
              logo={match?.hometeamLogo}
              type={'big'}
            />
            <View style={[styles.teamInfoContainer, {height: height * 0.124}]}>
              <View style={{height: height * 0.1, alignItems: 'center'}}>
                {match?.homeTeamName && match.homeTeamName.length < 6
                  ? <Text style ={[styles.fontWhite, {fontSize: height * 0.1, width: width * 0.5}]}>
                      {match.homeTeamName}
                    </Text>
                  : <View>
                      <Text style ={[styles.fontWhite, {fontSize: height * 0.045, marginTop: height * 0.01}]}>
                      {match.homeTeamName?.split(' ')[0]}
                      </Text>
                      <Text style ={[styles.fontWhite, {fontSize: height * 0.045, marginTop: -height * 0.01}]}>
                      {match.homeTeamName?.split(' ')[1]}
                      </Text>
                    </View>}
                </View>
                <Text style ={[styles.fontWhite, {fontSize: height * 0.024}]}>
                  {`${match?.homeCountryName} ${match?.sportName}/${match?.homeLeagueName}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{marginTop: height * 0.08}}>
            <TouchableOpacity
              onPress={onPressHomeTeamScore}
            >
              <MatchScore
                score={homeTeamScore === true ? match.homeTeamScore as number : '?'}
                color={'blue'}
                type={'big'}
              />
            </TouchableOpacity>
          </View>
          <View style={{alignItems:'center', width:width * 0.5, marginTop: height * 0.012}}>
            <Text style ={[styles.fontWhite, {fontSize: width * 0.16, width:width * 0.5}]}>
              {match.matchDate ? match.matchDate.slice(0, 4) : '0000'}
            </Text>
            <Text style ={[styles.fontWhite, {fontSize: width * 0.13, width:width * 0.5, marginTop:-height * 0.017}]}>
              {match.matchDate ? `${match.matchDate.slice(5, 7)}/${match.matchDate.slice(8, 10)}` : '0000'}
            </Text>
            <Text style ={[styles.fontWhite, {fontSize: width * 0.2, width:width * 0.5, marginTop:-height * 0.017}, {color : match.matchState === 'live' ? '#EA5579' : 'white'}]}>
              {match?.matchState}
            </Text>
          </View>
        </View>

        <View style={[styles.awayTeamContainer, {}]}>
        <TouchableOpacity onPress={()=>{navigateTeam(match.awayTeamId as number);}}>
          <View style={[styles.teamLogoContainer, {marginTop: height * 0.1, width: width * 0.5}]}>
            <TeamOrLeagueLogo
              logo={match?.awayteamLogo}
              type={'big'}
            />
            <View style={[styles.teamInfoContainer, {height: height * 0.124}]}>
              <View style={{height: height * 0.1, alignItems: 'center'}}>
                {match?.awayTeamName && match.awayTeamName.length < 6
                  ? <Text style ={[styles.fontBlue, {fontSize: height * 0.1, width: width * 0.5}]}>
                      {match.awayTeamName}
                    </Text>
                  : <View>
                      <Text style ={[styles.fontBlue, {fontSize: height * 0.045, marginTop: height * 0.01}]}>
                      {match.awayTeamName?.split(' ')[0]}
                      </Text>
                      <Text style ={[styles.fontBlue, {fontSize: height * 0.045, marginTop: -height * 0.01}]}>
                      {match.awayTeamName?.split(' ')[1]}
                      </Text>
                    </View>}
              </View>
              <Text style ={[styles.fontBlue, {fontSize: height * 0.024}]}>
              {`${match?.awayCountryName} ${match?.sportName}/${match?.awayLeagueName}`}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
          <View style={{marginTop: height * 0.08}}>
            <TouchableOpacity
                onPress={onPressAwayTeamScore}
              >
                <MatchScore
                  score={awayTeamScore === true ? match.awayTeamScore as number : '?'}
                  color={'white'}
                  type={'big'}
                />
              </TouchableOpacity>
          </View>
          <View style={{alignItems:'center', width:width * 0.5, marginTop: height * 0.012}}>
            <Text style ={[styles.fontBlue, {fontSize: width * 0.16}]}>
              ON-AIR
            </Text>
          </View>
          <View style={[styles.platformContainer, {width: width * 0.4, marginTop: height * 0.03}]}>
            <TeamOrLeagueLogo
              logo={null}
              type={'middle'}
            />
            <TeamOrLeagueLogo
              logo={null}
              type={'middle'}
            />
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
    height:0,
    alignItems: 'center',
    top: 0,
    zIndex: 0,
  },
  teamContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    top: 0,
    zIndex: -1,
  },
  homeTeamContainer: {
    height: '100%',
    width: '50%',
    backgroundColor: '#30397A',
    flexDirection: 'column',
    alignItems: 'center',
  },
  awayTeamContainer: {
    height: '100%',
    width: '50%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamLogoContainer: {
    alignItems: 'center',
  },
  teamInfoContainer: {
    alignItems: 'center',
  },
  platformContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontWhite: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  fontBlue: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },

});
export default React.memo(Match);