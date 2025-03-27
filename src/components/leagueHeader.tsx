import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SerchBar } from './serchBar/serchBar';
import { TeamLogo } from './teamLogo';
import { IsSelected } from './isSelected';
import { ApiContext } from '../context/context';


const LeagueHeader = () => {
  const { width, height } = Dimensions.get('window');

  const {leagueReq} = useContext(ApiContext);
  return (
    <View style={[styles.container, {width: width * 0.8, marginBottom: -height * 0.01 }]}>
      <SerchBar
        type="blue"
      />
      <View style={[styles.LeagueInfoContainer, {width: width * 0.8}]}>

        <View style={[styles.LeagueInfoTextContainer ]}>
            <Text style={[styles.LeagueInfoName, {fontSize: width * 0.15, marginBottom: -height * 0.01}]}>{leagueReq.data.league.leagueName}</Text>
            <Text style={[styles.LeagueInfoEtc, {fontSize: width * 0.055}]}>{`${leagueReq.data?.league?.countryName} ${leagueReq.data?.league?.sportName}`}</Text>
        </View>
        <View style={[styles.TeamLogo, {marginRight: -width * 0.07}]}>
          <TeamLogo
            logo={leagueReq?.data?.league?.leagueLogo}
            type={'big'}
            color={'white'}
          />
          <IsSelected
            isSelected={leagueReq.data?.league?.isSelected}
            teamId={null}
            leagueId={leagueReq.data?.league?.leagueId}
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
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
  LeagueInfoEtc: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
});

export default LeagueHeader;
