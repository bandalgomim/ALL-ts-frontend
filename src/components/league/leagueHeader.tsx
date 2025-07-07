import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from '../searchBar/serchBar';
import TeamOrLeagueLogo  from '../teamOrLeagueLogo';
import IsSelected from './../isSelected';
import { width, height } from '../../global';
import { LeagueContext } from '../../context/league.context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LeagueRankList from './leagueRankList';

const LeagueHeader = () => {
  const {leagueRes} = useContext(LeagueContext);
  const [record, setRecord] = useState(false);
  console.log('LeagueHeader leagueRes', leagueRes?.data?.league);
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
            initial={leagueRes?.data?.league?.leagueInit}
          />
          <IsSelected
            isSelected={leagueRes.data?.league?.isSelected}
            teamId={null}
            leagueId={leagueRes.data?.league?.leagueId}
            matchId={null}
          />
        </View>
      </View>
      <View style={styles.recordButton}>
        <TouchableOpacity style={{marginTop:-height*0.02, marginBottom:height*0.01, zIndex:3}} onPress={() => setRecord(!record)}>
          <Icon name={record === false ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={30} color={'#30397A'} />
        </TouchableOpacity>
        {record && (
          <View style={styles.record}>
            <View style={styles.recordItemView}>
              <View style={styles.recordItemBox}>
                <Text style={[styles.recordText, styles.recordItemLabel]}>WIN</Text>
              </View>
              <View style={styles.recordItemBox}>
                <Text style={[styles.recordText, styles.recordItemLabel]}>DRAW</Text>
              </View>
              <View style={styles.recordItemBox}>
                <Text style={[styles.recordText, styles.recordItemLabel]}>ROSE</Text>
              </View>
              <View style={styles.recordItemBox}>
                <Text style={[styles.recordText, styles.recordItemLabel, styles.recordPink]}>POINT</Text>
              </View>
            </View>
            <View style={styles.recordListView}>
              <LeagueRankList
                teamList={leagueRes.data?.teamList ?? []}
                matchList={leagueRes.data?.matchList ?? []}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LeagueInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TeamLogo: {
    flexDirection: 'row',
  },
  LeagueInfoTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    transform: [{ rotate: '2deg' }],
  },
  LeagueInfoName: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  LeagueInfoEtc: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  recordButton: {
    marginTop: -height * 0.015,
    marginBottom: -height * 0.015,
    alignItems: 'center',
  },
  record: {
    width: width * 0.85,
    marginBottom: height * 0.02
  },
  recordItemView: {
    marginLeft: width * 0.295,
    flexDirection: 'row',
  },
  recordListView: {
    height: height * 0.15,
  },
  recordText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textAlign: 'center',
  },

  recordItemBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.1,
  },

  recordItemLabel: {
    fontSize: width * 0.042,
    width: width * 0.1,
  },
  recordPink: {
    color: '#EA5579',
  },

});

export default React.memo(LeagueHeader);
