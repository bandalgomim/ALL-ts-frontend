import React, { useCallback, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SearchBar from './searchBar/serchBar';
import TeamOrLeagueLogo  from './teamOrLeagueLogo';
import IsSelected from './isSelected';

import { width, height } from '../global';
import { TeamContext } from '../context/team.context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ModalContext } from '../context/modal.context';
import { findNext } from './calendar/utills';

const TeamHeader = () => {
  const {teamRes} = useContext(TeamContext);
  const {setModalNextMatchVisible, setModalNextMatchContents} = useContext(ModalContext);
  const [record, setRecord] = useState(false);

  const onPressRemain = useCallback(() => {
      const matchInfo = findNext(teamRes.data.matchList)
      if (matchInfo) {
        setModalNextMatchContents(matchInfo);
        setModalNextMatchVisible(true)
      ;}
  }, [teamRes, setModalNextMatchVisible, setModalNextMatchContents]);

  const getRankSuffix = (rank: string): string => {
    if (rank === '1') return 'st';
    if (rank === '2') return 'nd';
    if (rank === '3') return 'rd';
    return 'th';
  };


  return (
    <View style={[styles.container, styles.headerContainer]}>
      <SearchBar type="blue" />
      <View style={[styles.teamInfoContainer, styles.headerTeamInfoContainer]}>
        <View style={[styles.teamLogo, styles.headerTeamLogo]}>
          <TeamOrLeagueLogo
            logo={teamRes?.data?.team?.teamLogo}
            type={'big'}
          />
        </View>
        <View style={[styles.teamInfo, styles.headerTeamInfo]}>
          <View style={styles.teamInfoTextContainer}>
            {teamRes?.data?.team?.teamName && teamRes?.data?.team?.teamName.length < 11
              ? <Text style={[styles.teamInfoName, styles.headerTeamInfoNameLarge]}>{teamRes.data?.team.teamName}</Text>
              : <View>
                  {teamRes.data?.team?.teamName?.split(' ').length === 3 ? (() => {
                    const [a, b, c] = teamRes.data.team.teamName.split(' ');
                    const first = `${a} ${b}`;
                    const second = `${b} ${c}`;
                    if (first.length <= second.length) {
                      return (
                        <>
                          <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{first}</Text>
                          <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{c}</Text>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{a}</Text>
                          <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{second}</Text>
                        </>
                      );
                    }
                  })() : (
                    teamRes.data?.team?.teamName?.split(' ').length > 1
                      ? <>
                          <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{teamRes.data?.team?.teamName?.split(' ')[0]}</Text>
                          <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{teamRes.data?.team?.teamName?.split(' ').slice(1).join(' ')}</Text>
                        </>
                      : <>
                          <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{null}</Text>
                          <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{teamRes.data?.team?.teamName?.split(' ')[0]}</Text>
                        </>
                  )}
                </View>}
            <Text style={[styles.teamInfoEtc, styles.headerTeamInfoEtc]}>
              {`${teamRes.data?.team?.countryName} ${teamRes.data?.team?.sportName}/${teamRes.data?.team?.leagueName}`}
            </Text>
          </View>
          <View>
            <IsSelected
              isSelected={teamRes.data?.team?.isTeamSelected}
              teamId={teamRes.data?.team?.teamId}
              leagueId={null}
              matchId={null}
            />
          </View>
        </View>
      </View>
      <View style={styles.recordButton}>
        <TouchableOpacity style={{marginLeft:-width*0.55, marginTop:height*0.02, marginBottom:height*-0.02, zIndex:3}} onPress={() => setRecord(!record)}>
          <Icon name={record === false ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={30} color={'#30397A'} />
        </TouchableOpacity>
        {record && (
          <View style={styles.record}>
            {teamRes.data?.team.rank.length == 1 ? <View style={styles.recordRankBox}>
              <Text style={[styles.recordText, styles.recordRank]}>{teamRes.data?.team?.rank}</Text>
              <Text style={[styles.recordText, styles.recordRankSuffix]}>{getRankSuffix(teamRes.data?.team?.rank)}</Text>
            </View>: <View style={styles.recordRankBox}>
              <Text style={[styles.recordText, styles.recordRank, {fontSize: width*0.19, width: width*0.16, marginTop: height*0.01}]}>{teamRes.data?.team?.rank}</Text>
              <Text style={[styles.recordText, styles.recordRankSuffix, {width: width*0.035}]}>{null}</Text>
            </View>}
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum]}>{teamRes.data?.team?.win}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>WIN</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, styles.recordGray]}>{teamRes.data?.team?.draw}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>DRAW</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, {opacity: 0.3}]}>{teamRes.data?.team?.rose}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>LOSE</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, styles.recordPink]}>{teamRes.data?.team?.point}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel, styles.recordPink]}>POINT</Text>
            </View>
            <TouchableOpacity onPress={onPressRemain} style={styles.recordImageContainer}>
              <Image
                resizeMode="contain"
                style={styles.recordImage}
                source={require('../assets/record/record.png')}
              />
              <Text style={styles.recordTextOnImage}>
                remain
              </Text>
            </TouchableOpacity>
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
  headerContainer: {
    width: width * 0.8,
    marginBottom: -height * 0.01,
  },
  searchBarContainer: {}, 
  teamInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTeamInfoContainer: {
    width: width * 0.8,
  },
  teamLogo: {
    justifyContent: 'flex-end',
  },
  headerTeamLogo: {
    marginBottom: -height * 0.01,
  },
  teamInfo: {
    flexDirection: 'row',
  },
  headerTeamInfo: {
    marginRight: -width * 0.07,
  },
  teamInfoTextContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: -height * 0.015,
    transform: [{ rotate: '-7deg' }],
  },
  teamInfoName: {
    textAlign: 'right',
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  headerTeamInfoNameLarge: {
    fontSize: width * 0.15,
    marginBottom: -height * 0.01,
  },
  headerTeamInfoNameSmall: {
    fontSize: width * 0.083,
    marginBottom: -height * 0.01,
  },
  teamInfoEtc: {
    textAlign: 'right',
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  headerTeamInfoEtc: {
    fontSize: width * 0.055,
    width: width * 0.55,
    marginTop: height * 0.005,
  },
  recordButton: {
    marginTop: -height * 0.015,
    marginBottom: -height * 0.015,
    //marginLeft: -width * 0.545,
    alignItems: 'center',
  },
  record: {
    flexDirection: 'row',
    width: width * 0.78,
    alignItems: 'flex-end',
    transform: [{ rotate: '-7deg' }],
    marginTop: -height * 0.03,
  },
  recordText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',

  },
  recordRankBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: -height * 0.02,
  },
  recordRank: {
    fontSize: width * 0.21,
    width: width * 0.085,
    textAlign: 'center',
  },
  recordRankSuffix: {
    fontSize: width * 0.13,
    width: width * 0.11,
    marginBottom: height * 0.011,
  },
  recordItemBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.11,
  },
  recordItemNum: {
    textAlign: 'center',
    width: width * 0.11,
    fontSize: width * 0.07,
  },
  recordItemLabel: {
    fontSize: width * 0.042,
    marginTop: -height * 0.008,
    marginLeft: -width * 0.012,
  },
  recordGray: {
    color: '#9E9E9E',
  },
  recordPink: {
    color: '#EA5579',
  },
  recordImageContainer: {
    width: width * 0.17,
    height: width * 0.1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordImage: {
    width: width * 0.14,
    height: width * 0.09,
  },
  recordTextOnImage: {
    position: 'absolute',
    color: 'white',
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
});

export default React.memo(TeamHeader);
