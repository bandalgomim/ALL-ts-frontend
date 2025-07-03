import React, { useCallback, useContext, useMemo } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from '../../global';
import { teamDto } from '../../model/league.dto';
import FastImage from 'react-native-fast-image';
import { ModalContext } from '../../context/modal.context';
import { matchListDto } from '../../model/main.dto';
import { findNextInLeague } from '../calendar/utills';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TeamPageParamList } from '../../model/navigation.dto';

interface LeagueRankListProps {
    teamList: teamDto[]
    matchList: matchListDto
}

const LeagueRankList: React.FC<LeagueRankListProps> = ({teamList, matchList}) => {
    const navigation = useNavigation<StackNavigationProp<TeamPageParamList>>();
    const navigateTeam = (teamId: number) => {
      navigation.navigate('TeamScreen', { teamId: teamId });
    };
  const sortedItems = useMemo(() => {
    return [...teamList].sort((a, b) => {
      // 먼저 section 기준 정렬
      if (a.section && b.section) {
      const sectionCompare = a.section.localeCompare(b.section);
      if (sectionCompare !== 0) {return sectionCompare;}}
      // section이 같으면 rank 기준 정렬
      return a.rank - b.rank;
    });
  }, [teamList]);

  function detectLang(text: string) {
    if (!text) {return;}
    const hasKR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
    const hasEnglish = /[a-zA-Z]/.test(text);
    if (hasKR && !hasEnglish) {
      return (<Text style={{fontFamily: 'esamanru OTF Medium', transform: [{ scaleY: 1.7 }], fontSize: width*0.03, marginTop: height*0.003 } }>{text}</Text>);
    }
    if (!hasKR && hasEnglish) {
      return (<Text style={{fontFamily: 'sb-it-ver1', fontSize: width*0.06, width: width*0.07}}> {text}</Text>);
    }
    return;
  }

  function detectLangRank(text: string) {
    if (!text) {return;}
    const hasKR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
    const hasEnglish = /[a-zA-Z]/.test(text);
    if (hasKR && !hasEnglish) {
      return (<Text style={styles.teamInitKR}>{text}</Text>);
    }
    if (!hasKR && hasEnglish) {
      return (<Text style={styles.teamInit}> {text}</Text>);
    }
    return;
  }

  const {setModalNextMatchVisible, setModalNextMatchContents} = useContext(ModalContext);
  const onPressRemain = useCallback((teamId: number) => {
      const matchInfo = findNextInLeague(matchList, teamId);
      if (matchInfo) {
      setModalNextMatchContents(matchInfo);
      setModalNextMatchVisible(true)
      ;}
  }, [matchList, setModalNextMatchContents, setModalNextMatchVisible]);
  const getRankSuffix = (rank: string): string => {
    if (rank === '1') {return 'st';}
    if (rank === '2') {return 'nd';}
    if (rank === '3') {return 'rd';}
    return 'th';
  };
  const renderItem = useCallback(({ item }: { item: teamDto }) => (
    <View style={styles.container}>
      {item.section && item.rank === '1' ? (()=>{
        const [a, b] = item.section.split(' ');
        return (
          <View style={styles.sectionHeader}>
            {detectLang(a)}
            {detectLang(b)}
          </View>
        );
      })() : null}
        <View style={styles.rankItem}>
            <View style={styles.rankView}>
                <Text style={styles.rankText}>{item.rank}</Text>
                <Text style={[styles.rankText, {fontSize: width*0.045, marginBottom:-height*0.0045}]}>{getRankSuffix(item.rank)}</Text>
            </View>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{navigateTeam(item.teamId);}}>
              <View style={styles.teamLogoView}>
                  <FastImage
                      resizeMode="contain"
                      source={{ uri: item.teamLogo as string}}
                      style={{ width: width * 0.05, height: width * 0.05 }}
                  />
              </View>
              <View style={styles.teamInitView}>
                  {detectLangRank(item.teamInit)}
              </View>
            </TouchableOpacity>
            <View style={[styles.numberTextView, {marginLeft: width * 0.006}]}>
                <Text style={styles.numberText}>{item.win}</Text>
            </View>
            <View style={styles.numberTextView}>
                <Text style={[styles.numberText, {color: "#9E9E9E"}]}>{item.draw}</Text>
            </View>
            <View style={styles.numberTextView}>
                <Text style={[styles.numberText, {opacity: 0.3}]}>{item.rose}</Text>
            </View>
            <View style={styles.numberTextView}>
                <Text style={[styles.numberText, {color: "#EA5579"}]}>{item.point}</Text>
            </View>
            <TouchableOpacity onPress={()=>onPressRemain(item.teamId)} style={styles.remainView}>
                <Image
                    resizeMode="contain"
                    style={styles.recordImage}
                    source={require('../../assets/record/record.png')}
                />
                <Text style={styles.recordTextOnImage}>
                    remain
                </Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.underBar]} />
    </View>
  ), []);

  return (
    <FlatList
      data={sortedItems}
      renderItem={renderItem}
      initialScrollIndex={0}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
      keyExtractor={(item, index) => `match-group-${index}-${item.teamId || index}`}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: height * 0.01,
    },
  sectionHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.03,
    marginLeft: width * 0.012,
    marginTop: height * 0.005,
    marginBottom: height * 0.002,
  },
  rankItem: {
    flexDirection: 'row',
    height: height * 0.035,
    alignItems: 'flex-end',
  },
  rankView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: width * 0.1,
    marginRight: width * 0.02,
    marginTop: -height * 0.005,
    marginBottom: height * 0.005,
  },
  rankText: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.08,
    color: '#30397A',
  },
  teamLogoView: {
    marginRight: width * 0.01,
    marginTop: height * 0.005,
  },
  teamLogo: {},
  teamInitView: {
    width: width * 0.08,
    marginRight: width * 0.03,
  },
  teamInit: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.06,
    width: width * 0.08,
    color: '#30397A',
  },
  teamInitKR: {
    fontFamily: 'NotoSansKR-ExtraBold',
    transform: [{ scaleY: 1 }],
    fontSize: width * 0.045,
    width: width * 0.1,
    lineHeight: width * 0.06,
    color: '#30397A',
    marginBottom: height * 0.004,
  },
  numberTextView: {
    width: width * 0.1,
  },
  numberText: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.06,
    width: width * 0.1,
    textAlign: 'center',
    color: '#30397A',
  },
  remainView: {
    width: width * 0.17,
    height: width * 0.08,
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
  underBar: {
    width: width * 0.85,
    height: height * 0.005,
    borderRadius: 10,
    marginTop: 0,
    backgroundColor: '#30397A',
  },

});

export default React.memo(LeagueRankList);
