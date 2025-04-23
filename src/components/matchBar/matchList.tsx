import React, { useCallback  } from 'react';
import {  FlatList, StyleSheet, Text, View } from 'react-native';
import MatchBar  from './matchBar';
import { matchListDto, matchDto } from '../../model/main.dto';

import { height, width } from '../../global';

interface ContentsProps {
  matchList: matchListDto,
  color: string;
}

const MatchList: React.FC<ContentsProps> = ( { matchList, color } ) => {
  const ITEM_HEIGHT = height * 0.1;
  //const initIndex = matchList.length >= 5 ? binarySearchClosestMatch(matchList) : 0;
  const renderItem = useCallback(( {item}: { item: matchDto[] } ) => {
    return (
      <View style={{marginBottom: height * 0.01}}>
        <View style={{flexDirection: "row", height: height * 0.027}}>
          <View style={[styles.frontDateBar, {backgroundColor: color === 'white' ? 'white' : '#30397A'}]}/>
          <View>
            <Text style={[styles.dateText, {color: color === 'white' ? 'white' : '#30397A'}]}>
              {item[0].matchDate}
            </Text>
          </View>
          <View style={[styles.backDateBar, {backgroundColor: color === 'white' ? 'white' : '#30397A'}]}/>
        </View>
        {item.map((data: matchDto) => (
          <MatchBar
            key={data.matchId} // Ensure each child has a unique key
            match={data}
            color={color}
          />
        ))}
      </View>
    );
  }, [color]);
  return (
    <>
    <FlatList
      style={{ marginTop: -height * 0.015 }}
      data={Object.values(matchList)}
      //keyExtractor={(item) => item[0].matchId.toString()}
      renderItem={renderItem}
      initialScrollIndex={0}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT, // 아이템 높이 (고정값이 필요함)
        offset: ITEM_HEIGHT * index,
        index,
      })}
      showsVerticalScrollIndicator={true} // 수직 스크롤바 숨기기 (필요한 경우)
    />
    </>
  );
};

const styles = StyleSheet.create({
  frontDateBar: {
    width: width * 0.12,
    height: height * 0.005,
    borderRadius: 10,
    marginTop: height * 0.011,
  },
  dateText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    fontSize: width * 0.05,
    width: width * 0.21,
    textAlign: 'center',
    marginBottom: -height * 0.00,
  },
  backDateBar: {
    width: width * 0.6,
    height: height * 0.005,
    borderRadius: 10,
    marginTop: height * 0.011,
  },
})
export default React.memo(MatchList);
