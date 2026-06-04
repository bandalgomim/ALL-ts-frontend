import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from '@components/searchBar/searchBar';
import IsSelected from '@components/isSelected';
import { width, height } from '@/global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LeagueRankList from './leagueRankList';
import LogoPicker from '@components/logo/logoPicker';
import RefreshButton from '@components/refresh';
import { getLeagueResDto } from '@model/league.dto';
import EmblemBig from '../emblem/EmblemBig';

interface LeagueHeaderProps {
  refetch: () => Promise<void>;
  data: getLeagueResDto;
}

const LeagueHeader: React.FC<LeagueHeaderProps> = ({ refetch, data }) => {
  const [record, setRecord] = useState(false);

  function detectLang(text: string, size: 'big' | 'medium' | 'small') {
    if (!text) { return; }
    if (size === 'big') {
      return (<Text style={[styles.baseInfoText, styles.LeagueInfoNameBig]}>{text}</Text>);
    } else if (size === 'medium') {
      return (<Text style={[styles.baseInfoText, styles.LeagueInfoNameMedium]}>{text}</Text>);
    } else if (size === 'small') {
      return (<Text style={[styles.baseInfoText, styles.headerTeamInfoNameSmall]}>{text}</Text>);
    } else { return; }
  }

  function detectLangth(inputText: string) {
    let textlength = 0;
    const hasKR = (char: string) => { return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(char); };
    const hasEnglish = (char: string) => { return /[a-zA-Z]/.test(char); };

    for (let i = 0; i < inputText.length; i++) {
      if (hasKR(inputText[i])) {
        textlength += 2;
      } else if (hasEnglish(inputText[i])) {
        textlength += 1;
      } else {
        textlength += 1;
      }
    }
    return textlength;
  }

  return (
    <View style={[styles.container, styles.containerSize]}>
      <SearchBar
        type="blue"
      />
      <View style={styles.LeagueInfoContainer}>

        <View style={styles.LeagueInfoTextContainer}>
            {data?.league?.leagueName ? (() => {
              const leagueNameSplit = data?.league?.leagueName.split(' ');
              const textLength = detectLangth(data?.league?.leagueName);
              if (leagueNameSplit.length === 1) {
                if (textLength < 9) {
                  return (
                    detectLang(leagueNameSplit[0], 'big')
                  );
                } else {
                  return (
                    detectLang(leagueNameSplit[0], 'medium')
                  );
                }
              } else if (leagueNameSplit.length === 2) {
                if (textLength < 9) {
                  return (
                    <View style={styles.flexRow}>
                      {detectLang(leagueNameSplit[0], 'big')}
                      {detectLang(leagueNameSplit[1], 'big')}
                    </View>
                  );
                } else {
                  return (
                    <>
                      {detectLang(leagueNameSplit[0], 'small')}
                      {detectLang(leagueNameSplit[1], 'small')}
                    </>
                  );
                }
              } else {
                if (textLength < 8) {
                  return (
                    <View style={styles.flexRow}>
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
                        <View style={styles.flexRow}>
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
                        <View style={styles.flexRow}>
                          {detectLang(leagueNameSplit[1], 'small')}
                          {detectLang(leagueNameSplit[2], 'small')}
                        </View>
                      </>
                    );
                  }
                }
              }
            })() : null}

            <Text style={[styles.baseInfoText, styles.LeagueInfoEtc]}>{`${data?.league?.countryName} ${data?.league?.sportName}`}</Text>
        </View>
        <View style={styles.TeamLogo}>
          <View style={styles.logoPickerWrapper}>
            <LogoPicker
              type={'league'}
              id={data?.league?.leagueId}
              uri={data?.league?.leagueLogo || ''}
            />
          </View>
          <EmblemBig
            logo={data?.league?.leagueLogo}
            initial={data?.league?.leagueInit}
          />
          <View>
            <IsSelected
              isSelected={data?.league?.isSelected}
              teamId={null}
              leagueId={data?.league?.leagueId}
              matchId={null}
            />
            <RefreshButton refetch={refetch} />
          </View>

        </View>

      </View>
      <View style={styles.recordButton}>
        <TouchableOpacity style={styles.recordToggle} onPress={() => setRecord(!record)}>
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
                teamList={data?.teamList ?? []}
                matchList={data?.matchList ?? []}
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
  containerSize: {
    width: width * 0.8,
    marginBottom: -height * 0.01,
  },
  flexRow: {
    flexDirection: 'row',
  },
  LeagueInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
  },
  TeamLogo: {
    flexDirection: 'row',
    marginRight: -width * 0.07,
  },
  logoPickerWrapper: {
    marginLeft: -height * 0.025,
    marginRight: -height * 0.005,
    marginTop: height * 0.01,
  },
  LeagueInfoTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    transform: [{ rotate: '2deg' }],
    height: height * 0.12,
  },
  // 공통 텍스트 베이스 스타일
  baseInfoText: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  LeagueInfoName: {
    // baseInfoText 속성 상속 (사용시 함께 적용)
  },
  LeagueInfoNameBig: {
    fontSize: width * 0.15,
    marginBottom: -height * 0.015,
  },
  LeagueInfoNameMedium: {
    fontSize: width * 0.13,
    marginBottom: -height * 0.015,
    marginTop: width * 0.04,
  },
  headerTeamInfoNameSmall: {
    fontSize: width * 0.083,
    marginBottom: -height * 0.01,
  },
  LeagueInfoEtc: {
    marginTop: height * 0.005,
    fontSize: width * 0.055,
  },
  recordButton: {
    marginTop: -height * 0.015,
    marginBottom: -height * 0.015,
    alignItems: 'center',
  },
  recordToggle: {
    marginTop: -height * 0.02,
    marginBottom: height * 0.01,
    zIndex: 3,
  },
  record: {
    width: width * 0.85,
    marginBottom: height * 0.02,
  },
  recordItemView: {
    marginLeft: width * 0.295,
    flexDirection: 'row',
  },
  recordListView: {
    height: height * 0.487,
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
