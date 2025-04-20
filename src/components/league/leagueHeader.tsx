import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../searchBar/serchBar';
import TeamOrLeagueLogo  from '../teamOrLeagueLogo';
import IsSelected from './../isSelected';
import { width, height } from '../../global';
import { LeagueContext } from '../../context/league.context';

const LeagueHeader = () => {
  const {leagueRes} = useContext(LeagueContext);
  return (
    <View style={[styles.container, {width: width * 0.8, marginBottom: -height * 0.01 }]}>
      <SearchBar
        type="blue"
      />
      <View style={[styles.LeagueInfoContainer, {width: width * 0.8}]}>

        <View style={[styles.LeagueInfoTextContainer ]}>
            <Text style={[styles.LeagueInfoName, {fontSize: width * 0.15, marginBottom: -height * 0.01}]}>{leagueRes.data.league?.leagueName ?? "TBD"}</Text>
            <Text style={[styles.LeagueInfoEtc, {fontSize: width * 0.055}]}>{`${leagueRes.data?.league?.countryName} ${leagueRes.data?.league?.sportName}`}</Text>
        </View>
        <View style={[styles.TeamLogo, {marginRight: -width * 0.07}]}>
          <TeamOrLeagueLogo
            logo={leagueRes?.data?.league?.leagueLogo}
            type={'big'}
          />
          <IsSelected
            isSelected={leagueRes.data?.league?.isSelected}
            teamId={null}
            leagueId={leagueRes.data?.league?.leagueId}
            matchId={null}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flexDirection: 'column',
    justifyContent: 'center', // 가로 방향 중앙 정렬
    alignItems: 'center', // 세로 방향 중앙 정렬
    //
  },
  LeagueInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TeamLogo: {
    flexDirection: 'row',
  },
  LeagueInfo: {
    flexDirection: 'row',
  },
  LeagueInfoTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    transform: [{ rotate: '2deg' }],
    //
  },
  LeagueInfoName: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  LeagueInfoEtc: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
});

export default React.memo(LeagueHeader);
