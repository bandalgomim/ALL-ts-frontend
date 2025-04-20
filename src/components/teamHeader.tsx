import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from './searchBar/serchBar';
import TeamOrLeagueLogo  from './teamOrLeagueLogo';
import IsSelected from './isSelected';

import { width, height } from '../global';
import { TeamContext } from '../context/team.context';

const TeamHeader = () => {
  const {teamRes} = useContext(TeamContext);
  return (
    <View style={[styles.container, {width: width * 0.8, marginBottom: -height * 0.01 }]}>
      <SearchBar
        type="white"
      />
      <View style={[styles.teamInfoContainer, {width: width * 0.8}]}>
        <View style={[styles.teamLogo, {marginBottom:-height * 0.01 }]}>
          <TeamOrLeagueLogo
            logo={teamRes?.data?.team?.teamLogo}
            type={'big'}
          />
        </View>
        <View style={[styles.teamInfo, {marginRight: -width * 0.07}]}>
          <View style={[styles.teamInfoTextContainer ]}>
            {teamRes?.data?.team?.teamName && teamRes?.data?.team?.teamName.length < 10
              ? <Text style={[styles.teamInfoName, {fontSize: width * 0.15, marginBottom: -height * 0.01}]}>{teamRes.data?.team.teamName}</Text>
              : <View>
                  {teamRes.data?.team?.teamName?.split(' ').length > 1
                  ? <>
                      <Text style={[styles.teamInfoName, {fontSize: width * 0.083, marginBottom: -height * 0.01}]}>{teamRes.data?.team?.teamName?.split(' ')[0]}</Text>
                      <Text style={[styles.teamInfoName, {fontSize: width * 0.083, marginBottom: -height * 0.01}]}>{teamRes.data?.team?.teamName?.split(' ').slice(1).join(' ')}</Text>
                    </>
                  : <>
                      <Text style={[styles.teamInfoName, {fontSize: width * 0.083, marginBottom: -height * 0.01}]}>{null}</Text>
                      <Text style={[styles.teamInfoName, {fontSize: width * 0.083, marginBottom: -height * 0.01}]}>{teamRes.data?.team?.teamName?.split(' ')[0]}</Text>
                    </>}
                </View>}

            <Text style={[styles.teamInfoEtc, {fontSize: width * 0.055, width: width * 0.5}]}>{`${teamRes.data?.team?.countryName} ${teamRes.data?.team?.sportName}/${teamRes.data?.team?.leagueName}`}</Text>
          </View>
          <IsSelected
             isSelected={teamRes.data?.team?.isTeamSelected}
             teamId={teamRes.data?.team?.teamId}
             leagueId={null}
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
  },
  searchBarContainer: {

  },
  teamInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamLogo: {
    justifyContent: 'flex-end',
  },
  teamInfo: {
    flexDirection: 'row',
  },
  teamInfoTextContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    transform: [{ rotate: '-7deg' }],
    //
  },
  teamInfoName: {
    textAlign: 'right',
    fontFamily: 'sb-it-ver1',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  teamInfoEtc: {
    textAlign: 'right',
    fontFamily: 'sb-it-ver1',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
});

export default React.memo(TeamHeader);
