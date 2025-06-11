import React, { useCallback, useContext } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from '../../global';
import { teamDto } from '../../model/league.dto';
import FastImage from 'react-native-fast-image';
import { ModalContext } from '../../context/modal.context';
import { matchListDto } from '../../model/main.dto';
import { findNextInLeague } from '../calendar/utills';

interface LeagueRankListProps {
    teamList: teamDto[]
    matchList: matchListDto
}

const LeagueRankList: React.FC<LeagueRankListProps> = ({teamList, matchList}) => {
  const {setModalNextMatchVisible, setModalNextMatchContents} = useContext(ModalContext);
  const onPressRemain = useCallback((teamId: number) => {
      const matchInfo = findNextInLeague(matchList, teamId);
      if (matchInfo) {
      setModalNextMatchContents(matchInfo);
      setModalNextMatchVisible(true)
      ;}
  }, [matchList, setModalNextMatchContents, setModalNextMatchVisible]);
  const renderItem = useCallback(({ item }: { item: teamDto }) => (
    <View style={styles.container}>
        <View style={styles.rankItem}>
            <View style={styles.rankView}>
                <Text style={styles.rankText}>2</Text>
                <Text style={[styles.rankText, {fontSize: width*0.045, marginBottom:-height*0.0045}]}>st</Text>
            </View>
            <View style={styles.teamLogoView}>
                <FastImage
                    resizeMode="contain"
                    source={{ uri: item.teamLogo as string}}
                    style={{ width: width * 0.05, height: width * 0.05 }}
                />
            </View>
            <View style={styles.teamInitView}>
                <Text style={styles.teamInit}>{item.teamInit}</Text>
            </View>
            <View style={styles.numberTextView}>
                <Text style={styles.numberText}>12</Text>
            </View>
            <View style={styles.numberTextView}>
                <Text style={[styles.numberText, {color: "#9E9E9E"}]}>12</Text>
            </View>
            <View style={styles.numberTextView}>
                <Text style={[styles.numberText, {opacity: 0.3}]}>12</Text>
            </View>
            <View style={styles.numberTextView}>
                <Text style={[styles.numberText, {color: "#EA5579"}]}>12</Text>
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
      data={teamList}
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
        //borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.01,
    },
  rankItem: {
    flexDirection: 'row',
    height: height * 0.035,
    alignItems: 'flex-end',
  },
  rankView: {
    //borderWidth: 1,
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
    //borderWidth: 1,
    marginRight: width * 0.01,
    marginBottom: height * 0.005,
  },
  teamLogo: {},
  teamInitView: {
    //borderWidth: 1,
    width: width * 0.08,
    marginRight: width * 0.03,
  },
  teamInit: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.06,
    width: width * 0.08,
    color: '#30397A',
  },
  numberTextView: {

  },
  numberText: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.06,
    width: width * 0.1,
    //borderWidth: 1,
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
