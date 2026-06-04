import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SearchBar from '../searchBar/searchBar';
import IsSelected from '../isSelected';
import RefreshButton from '../refresh';
import { width, height } from '@/global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useModalNextMatchActions } from '@context/modal/modalNextMatch.context';
import { findNext } from '../calendar/utills';
import LogoPicker from '../logo/logoPicker';
import { getTeamResDto } from '@model/team.dto';
import EmblemBig from '../emblem/EmblemBig';

interface TeamHeaderProps {
  refetch: () => Promise<void>;
  data?: getTeamResDto;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ refetch, data }) => {
  const { open } = useModalNextMatchActions();
  const [record, setRecord] = useState(false);

  function detectLang(text: string, size: 'big' | 'small' | 'medium') {
    if (!text) { return; }
    if (size === 'big') {
      return (<Text style={[styles.baseText, styles.teamInfoName, styles.headerTeamInfoNameLarge]}>{text}</Text>);
    } else if (size === 'medium') {
      return (<Text style={[styles.baseText, styles.teamInfoName, styles.headerTeamInfoNameMedium]}>{text}</Text>);
    } else if (size === 'small') {
      return (<Text style={[styles.baseText, styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{text}</Text>);
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

  const onPressRemain = useCallback(() => {
    if (!data?.matchList) { return; }
    const matchInfo = findNext(data.matchList);
    if (matchInfo) {
      open(matchInfo);
    }
  }, [data, open]);

  const getRankSuffix = (rank: string): string => {
    if (rank === '1') { return 'st'; }
    if (rank === '2') { return 'nd'; }
    if (rank === '3') { return 'rd'; }
    return 'th';
  };

  return (
    <View style={[styles.container, styles.headerContainer]}>
      <SearchBar type="blue" />
      <View style={[styles.teamInfoContainer, styles.headerTeamInfoContainer]}>
        <View style={[styles.teamLogo, styles.headerTeamLogo]}>
          <EmblemBig
            logo={data?.team?.teamLogo ?? null}
            initial={data?.team?.teamInit ?? ''}
          />
        </View>
        <View style={styles.logoPickerContainer}>
          <LogoPicker
            type={'team'}
            id={data?.team?.teamId ?? 0}
            uri={data?.team?.teamLogo ?? ''}
          />
        </View>
        <View style={[styles.teamInfo, styles.headerTeamInfo]}>
          <View style={styles.teamInfoTextContainer}>
            {data?.team?.teamName ? (() => {
              const teamNameSplit = data?.team?.teamName.split(' ');
              const textLength = detectLangth(data?.team?.teamName);
              if (teamNameSplit.length === 1) {
                if (textLength < 9) {
                  return (
                    <>
                      {detectLang(teamNameSplit[0], 'big')}
                    </>
                  );
                } else {
                  if (textLength < 14) {
                    return (
                      <>
                        <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{null}</Text>
                        {detectLang(teamNameSplit[0], 'medium')}
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Text style={[styles.teamInfoName, styles.headerTeamInfoNameSmall]}>{null}</Text>
                        {detectLang(teamNameSplit[0], 'small')}
                      </>
                    );
                  }
                }
              } else if (teamNameSplit.length === 2) {
                if (textLength < 9) {
                  return (
                    <View style={styles.flexRow}>
                      {detectLang(teamNameSplit[0], 'big')}
                      {detectLang(teamNameSplit[1], 'big')}
                    </View>
                  );
                } else {
                  if (textLength < 14) {
                    return (
                      <View style={styles.flexRow}>
                        {detectLang(teamNameSplit[0], 'medium')}
                        {detectLang(teamNameSplit[1], 'medium')}
                      </View>
                    );
                  } else {
                    return (
                      <View>
                        {detectLang(teamNameSplit[0], 'small')}
                        {detectLang(teamNameSplit[1], 'small')}
                      </View>
                    );
                  }
                }
              } else {
                if (textLength < 9) {
                  return (
                    <View style={styles.flexRow}>
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
                        <View style={styles.flexRow}>
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
                        <View style={styles.flexRow}>
                          {detectLang(teamNameSplit[1], 'small')}
                          {detectLang(teamNameSplit[2], 'small')}
                        </View>
                      </>
                    );
                  }
                }
              }
            })() : null}
            <Text style={[styles.baseText, styles.teamInfoEtc, styles.headerTeamInfoEtc]}>
              {`${data?.team?.countryName} ${data?.team?.sportName}`.length > 13
                ? `${data?.team?.sportName}/${data?.team?.leagueName}`
                : `${data?.team?.countryName} ${data?.team?.sportName}/${data?.team?.leagueName}`}
            </Text>
          </View>
          <View>
            <IsSelected
              isSelected={data?.team?.isTeamSelected ?? null}
              teamId={data?.team?.teamId ?? null}
              leagueId={null}
              matchId={null}
            />
            <RefreshButton refetch={refetch} />
          </View>
        </View>
      </View>
      <View style={styles.recordButton}>
        <TouchableOpacity style={styles.recordToggleButton} onPress={() => setRecord(!record)}>
          <Icon name={record === false ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={30} color={'#30397A'} />
        </TouchableOpacity>
        {record && (
          <View style={styles.record}>
            {(data?.team as any)?.rank?.length === 1 ? (
              <View style={styles.recordRankBox}>
                <Text style={[styles.recordText, styles.recordRank]}>{(data?.team as any)?.rank}</Text>
                <Text style={[styles.recordText, styles.recordRankSuffix]}>{getRankSuffix((data?.team as any)?.rank)}</Text>
              </View>
            ) : (
              <View style={styles.recordRankBox}>
                <Text style={[styles.recordText, styles.recordRankDouble]}>{(data?.team as any)?.rank}</Text>
                <Text style={[styles.recordText, styles.recordRankSuffixNarrow]}>{null}</Text>
              </View>
            )}
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum]}>{(data?.team as any)?.win}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>WIN</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, styles.recordGray]}>{(data?.team as any)?.draw}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>DRAW</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, styles.recordFaded]}>{(data?.team as any)?.lose}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel]}>LOSE</Text>
            </View>
            <View style={styles.recordItemBox}>
              <Text style={[styles.recordText, styles.recordItemNum, styles.recordPink]}>{(data?.team as any)?.point}</Text>
              <Text style={[styles.recordText, styles.recordItemLabel, styles.recordPink]}>POINT</Text>
            </View>
            <TouchableOpacity onPress={onPressRemain} style={styles.recordImageContainer}>
              <Image
                resizeMode="contain"
                style={styles.recordImage}
                source={require('@assets/record/record.png')}
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
  logoPickerContainer: {
    marginLeft: -height * 0.005,
    marginRight: -height * 0.025,
    marginTop: height * 0.01,
  },
  flexRow: {
    flexDirection: 'row',
  },
  recordToggleButton: {
    marginLeft: -width * 0.55,
    marginTop: height * 0.02,
    marginBottom: height * -0.02,
    zIndex: 3,
  },
  baseText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 3 },
  },
  teamInfoName: {
    textAlign: 'right',
    marginLeft: width * 0.015,
  },
  headerTeamInfoNameLarge: {
    height: height * 0.085,
    fontSize: width * 0.15,
    marginBottom: -height * 0.01,
  },
  headerTeamInfoNameMedium: {
    height: height * 0.085,
    fontSize: width * 0.11,
    paddingTop: height * 0.02,
    marginBottom: -height * 0.01,
  },
  headerTeamInfoNameSmall: {
    height: height * 0.05,
    fontSize: width * 0.083,
    marginBottom: -height * 0.01,
  },
  teamInfoEtc: {
    textAlign: 'right',
  },
  headerTeamInfoEtc: {
    fontSize: width * 0.055,
    width: width * 0.55,
    marginTop: height * 0.005,
  },
  recordButton: {
    marginTop: -height * 0.015,
    marginBottom: -height * 0.015,
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
  recordRankDouble: {
    fontSize: width * 0.19,
    width: width * 0.16,
    marginTop: height * 0.01,
    textAlign: 'center',
  },
  recordRankSuffix: {
    fontSize: width * 0.13,
    width: width * 0.11,
    marginBottom: height * 0.011,
  },
  recordRankSuffixNarrow: {
    fontSize: width * 0.13,
    width: width * 0.035,
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
  recordFaded: {
    opacity: 0.3,
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
