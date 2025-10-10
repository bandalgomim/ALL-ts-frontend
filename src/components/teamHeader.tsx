import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SearchBar from './searchBar/searchBar';
import TeamOrLeagueLogo  from './teamOrLeagueLogo';
import IsSelected from './isSelected';
import RefreshButton from './refresh';
import { width, height } from '../global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useModalNextMatchActions } from '../context/modal/modalNextMatch.context';
import { findNext } from './calendar/utills';
import LogoPicker from './logo/logoPicker';
import { getTeamResDto } from '../model/team.dto';

interface TeamHeaderProps {
  refetch: () => Promise<void>;
  data?: getTeamResDto;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ refetch, data }) => {
  const { open } = useModalNextMatchActions()
  const [record, setRecord] = useState(false);

  function detectLang(text: string, size: 'big' | 'small') {
    if (!text) {return;}
    if (size === 'big') {
        return (<Text style={[styles.teamInfoName, styles.headerTeamInfoNameLarge]}>{text}</Text>);
    } else if (size === 'small') {
        return (<Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{text}</Text>);
    } else {return;}
  }
  function detectLangth(text: string) {
      let textlength = 0;
      const hasKR = (text: string) => {return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);};
      const hasEnglish = (text: string) => {return /[a-zA-Z]/.test(text);};

      for (let i = 0; i < text.length; i++) {
        if (hasKR(text[i])) {
          textlength += 2; // 한글은 2로 계산
        } else if (hasEnglish(text[i])) {
          textlength += 1; // 영어는 1로 계산
        } else {
          textlength += 1; // 기타 문자는 1로 계산
        }
      }
      return textlength;
    }

  const onPressRemain = useCallback(() => {
      const matchInfo = findNext(data.matchList)
      if (matchInfo) {
        open(matchInfo)
      ;}
  }, [data]);

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
            logo={data?.team?.teamLogo}
            type={'big'}
            initial={data?.team?.teamInit}
          />

        </View>
        <View style={{marginLeft: -height * 0.005, marginRight: -height*0.025, marginTop: height * 0.01}}>
          <LogoPicker
            type={'team'}
            id={data?.team?.teamId}
            uri={data?.team?.teamLogo}
          />
        </View>
        <View style={[styles.teamInfo, styles.headerTeamInfo]}>
          <View style={styles.teamInfoTextContainer}>
            {data?.team?.teamName ? (() => {
              const teamNameSplit = data?.team?.teamName.split(' ');
              const textLength = detectLangth(data?.team?.teamName);
              if (teamNameSplit.length === 1) {
                if (textLength < 11) {
                  return (
                    <>
                      {detectLang(teamNameSplit[0], 'big')}
                    </>
                  );
                } else {
                  return (
                    <>
                      <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{null}</Text>
                      {detectLang(teamNameSplit[0], 'small')}
                    </>
                  )
                }
              } else if (teamNameSplit.length === 2) {
                if (textLength < 11) {
                  return (
                    <View style={{flexDirection: 'row'}}>
                      {detectLang(teamNameSplit[0], 'big')}
                      {detectLang(teamNameSplit[1], 'big')}
                    </View>
                  );
                } else{
                  return (
                    <>
                      {detectLang(teamNameSplit[0], 'small')}
                      {detectLang(teamNameSplit[1], 'small')}
                    </>
                  );
                }
              } else {
                if (textLength < 11) {
                  return (
                    <View style={{flexDirection: 'row'}}>
                      {detectLang(teamNameSplit[0], 'big')}
                      {detectLang(teamNameSplit[1], 'big')}
                      {detectLang(teamNameSplit[2], 'big')}
                    </View>
                  );
                } else {
                  const first = `${teamNameSplit[0]} ${teamNameSplit[1]}`;
                  const second = `${teamNameSplit[1]} ${teamNameSplit[2]}`;
                  if (detectLangth(first) <= detectLangth(second)) {
                    return (
                      <>
                        <View style={{flexDirection: 'row'}}>
                          {detectLang(teamNameSplit[0], 'small')}
                          {detectLang(teamNameSplit[1], 'small')}
                        </View>
                        <>
                          {detectLang(teamNameSplit[2], 'small')}
                        </>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <>
                          {detectLang(teamNameSplit[0], 'small')}
                        </>
                        <View style={{flexDirection: 'row'}}>
                          {detectLang(teamNameSplit[1], 'small')}
                          {detectLang(teamNameSplit[2], 'small')}
                        </View>
                      </>
                    );
                  }
                }
              }
            })() : null}
            <Text style={[styles.teamInfoEtc, styles.headerTeamInfoEtc]}>

              {`${data?.team?.countryName} ${data?.team?.sportName}/${data?.team?.leagueName}`}
            </Text>
          </View>
          <View>
            <IsSelected
              isSelected={data?.team?.isTeamSelected}
              teamId={data?.team?.teamId}
              leagueId={null}
              matchId={null}
            />
            <RefreshButton refetch={refetch} />
          </View>
        </View>
      </View>
      <View style={styles.recordButton}>
        <TouchableOpacity style={{marginLeft:-width*0.55, marginTop:height*0.02, marginBottom:height*-0.02, zIndex:3}} onPress={() => setRecord(!record)}>
          <Icon name={record === false ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={30} color={'#30397A'} />
        </TouchableOpacity>
        {record && (
          <View style={styles.record}>
            {data?.team.rank.length == 1 ? <View style={styles.recordRankBox}>
              <Text style={[styles.recordText, styles.recordRank]}>{data?.team?.rank}</Text>
              <Text style={[styles.recordText, styles.recordRankSuffix]}>{getRankSuffix(data?.team?.rank)}</Text>
            </View>: <View style={styles.recordRankBox}>
              <Text style={[styles.recordText, styles.recordRank, {fontSize: width*0.19, width: width*0.16, marginTop: height*0.01}]}>{data?.team?.rank}</Text>
              <Text style={[styles.recordText, styles.recordRankSuffix, {width: width*0.035}]}>{null}</Text>
            </View>}
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum]}>{data?.team?.win}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>WIN</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, styles.recordGray]}>{data?.team?.draw}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>DRAW</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, {opacity: 0.3}]}>{data?.team?.lose}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>LOSE</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, styles.recordPink]}>{data?.team?.point}</Text>
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
    marginLeft: width * 0.015,
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
