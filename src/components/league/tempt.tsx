import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from '../searchBar/searchBar';
import TeamOrLeagueLogo  from '../teamOrLeagueLogo';
import IsSelected from './../isSelected';
import { width, height } from '../../global';
import { LeagueContext } from '../../context/league.context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LeagueRankList from './leagueRankList';
import LogoPicker from '../logo/logoPicker';
import { refetchDto } from '../../model/refetch.dto';
import RefreshButton from '../refresh';

const LeagueHeader: React.FC<refetchDto> = ({ refetch }) => {
  const {leagueRes} = useContext(LeagueContext);
  const [record, setRecord] = useState(false);

  function detectLang(text: string, size: 'big' | 'medium' | 'small') {
      if (!text) {return;}
      if (size === 'big') {
          return (<Text style={[styles.LeagueInfoName, {fontSize: width * 0.15, marginBottom: -height * 0.01}]}>{text}</Text>);
      } else if (size === 'medium') {
          return (<Text style={[styles.LeagueInfoName, {fontSize: width * 0.13, marginBottom: -height * 0.01, marginTop:width*0.04}]}>{text}</Text>);
      } 
      else if (size === 'small') {
          return (<Text style={[styles.LeagueInfoName, styles.headerTeamInfoNameSmall]}>{text}</Text>);
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

  return (
    <View style={[styles.container, {width: width * 0.8, marginBottom: -height * 0.01 }]}>
      <SearchBar
        type="blue"
      />
      <View style={[styles.LeagueInfoContainer, {width: width * 0.8}]}>

        <View style={[styles.LeagueInfoTextContainer ]}>
            {leagueRes?.data?.league?.leagueName ? (() => {
                          const leagueNameSplit = leagueRes.data?.league?.leagueName.split(' ');
                          const textLength = detectLangth(leagueRes.data?.league?.leagueName);
                          if (leagueNameSplit.length === 1) {
                            if (textLength < 9) {
                              return (
                                  detectLang(leagueNameSplit[0], 'big')
                              );
                            } else {
                              return (
                                  detectLang(leagueNameSplit[0], 'medium')
                              )
                            }
                          } else if (leagueNameSplit.length === 2) {
                            if (textLength < 9) {
                              return (
                                <View style={{flexDirection: 'row'}}>
                                  {detectLang(leagueNameSplit[0], 'big')}
                                  {detectLang(leagueNameSplit[1], 'big')}
                                </View>
                              );
                            } else{
                              return (
                                <>
                                  {detectLang(leagueNameSplit[0], 'small')}
                                  {detectLang(leagueNameSplit[1], 'small')}
                                </>
                              );
                            }
                          } else {
                            if (textLength < 11) {
                              return (
                                <View style={{flexDirection: 'row'}}>
                                  {detectLang(leagueNameSplit[0], 'big')}
                                  {detectLang(leagueNameSplit[1], 'big')}
                                  {detectLang(leagueNameSplit[2], 'big')}
                                </View>
                              );
                            } else {
                              const first = `${leagueNameSplit[0]} ${leagueNameSplit[1]}`;
                              const second = `${leagueNameSplit[1]} ${leagueNameSplit[2]}`;
                              if (detectLangth(first) <= detectLangth(second)) {
                                return (
                                  <>
                                    <View style={{flexDirection: 'row'}}>
                                      {detectLang(leagueNameSplit[0], 'small')}
                                      {detectLang(leagueNameSplit[1], 'small')}
                                    </View>
                                    <>
                                      {detectLang(leagueNameSplit[2], 'small')}
                                    </>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <>
                                      {detectLang(leagueNameSplit[0], 'small')}
                                    </>
                                    <View style={{flexDirection: 'row'}}>
                                      {detectLang(leagueNameSplit[1], 'small')}
                                      {detectLang(leagueNameSplit[2], 'small')}
                                    </View>
                                  </>
                                );
                              }
                            }
                          }
                        })() : null}
            
            <Text style={[styles.LeagueInfoEtc, {fontSize: width * 0.055}]}>{`${leagueRes.data?.league?.countryName} ${leagueRes.data?.league?.sportName}`}</Text>
        </View>
        <View style={[styles.TeamLogo, {marginRight: -width * 0.07}]}>
        <View style={{marginLeft: -height * 0.025, marginRight: -height*0.005, marginTop: height * 0.01}}>
            <LogoPicker
              type={'league'}
              id={leagueRes.data?.league?.leagueId}
              uri={leagueRes.data?.league?.leagueLogo || ''}
            />
          </View>
          <TeamOrLeagueLogo
            logo={leagueRes?.data?.league?.leagueLogo}
            type={'big'}
            initial={leagueRes?.data?.league?.leagueInit}
          />
          <View>
            <IsSelected
              isSelected={leagueRes.data?.league?.isSelected}
              teamId={null}
              leagueId={leagueRes.data?.league?.leagueId}
              matchId={null}
            />
            <RefreshButton refetch={refetch} />
          </View>
          
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
                <Text style={[styles.recordText, styles.recordItemLabel]}>LOSE</Text>
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
    height: height * 0.12,
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
    height: height * 0.47,
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
  headerTeamInfoNameMedium: {
    fontSize: width * 0.13,
    marginTop: -height * 0.02,
    marginBottom: -height * 0.01,
    marginLeft: -width * 0.005,
  },
  headerTeamInfoNameSmall: {
    fontSize: width * 0.083,
    marginBottom: -height * 0.01,
  },

});

export default React.memo(LeagueHeader);