import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SerchBar } from './serchBar/serchBar';
import { TeamLogo } from './teamLogo';
import { IsSelected } from './isSelected';
import { ApiContext } from '../context/context';


const TeamHeader = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const {team} = useContext(ApiContext);
  return (
    <View style={[styles.container, {width: width*0.8, marginBottom: -height*0.01, }]}>
      <SerchBar
        type="white" 
      />
      <View style={[styles.teamInfoContainer, {width: width*0.8}]}>
        <View style={[styles.teamLogo, {marginBottom:-height*0.01, }]}>
          <TeamLogo
            logo={team?.data?.team?.teamLogo}
            type={'big'}
            color={'blue'}
          />
        </View>
        <View style={[styles.teamInfo, {marginRight: -width*0.07}]}>
          <View style={[styles.teamInfoTextContainer, ]}>
            {team?.data?.team?.teamName && team?.data?.team?.teamName.length < 10 
              ? <Text style={[styles.teamInfoName, {fontSize: width*0.15, marginBottom: -height*0.01}]}>{team.data?.team.teamName}</Text> 
              : <View>
                  <Text style={[styles.teamInfoName, {fontSize: width*0.083, marginBottom: -height*0.01}]}>{team.data?.team?.teamName?.split(" ")[0]}</Text>
                  <Text style={[styles.teamInfoName, {fontSize: width*0.083, marginBottom: -height*0.01}]}>{team.data?.team?.teamName?.split(" ").slice(1).join(" ")}</Text>
                </View>}
            
            <Text style={[styles.teamInfoEtc, {fontSize: width*0.055, width: width*0.5}]}>{`${team.data?.team?.countryName} ${team.data?.team?.sportName}/${team.data?.team?.leagueName}`}</Text>
          </View>
          <IsSelected
             isSelected={team.data?.team?.isTeamSelected}
             teamId={team.data?.team?.teamId}
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
    //
  },
  teamInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  teamLogo: {
    justifyContent: 'flex-end'
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
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  teamInfoEtc: {
    textAlign: 'right',
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  }
});

export default TeamHeader;