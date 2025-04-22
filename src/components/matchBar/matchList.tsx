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
  console.log('matchList', matchList);
  //const initIndex = matchList.length >= 5 ? binarySearchClosestMatch(matchList) : 0;
  const renderItem = useCallback(( {item}: { item: matchDto[] } ) => {
    return (
      <>
        <View style={{ height: height * 0.027}}>
          <Text style={[styles.dateText, {color: color === 'white' ? 'white' : '#30397A'}]}>
            {item[0].matchDate}
          </Text>
        </View>
        {item.map((data: matchDto) => (
          <MatchBar
            key={data.matchId} // Ensure each child has a unique key
            match={data}
            color={color}
          />
        ))}
      </>
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
  dateText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    fontSize: width * 0.055,
    marginLeft: width * 0.04,
    marginBottom: -height * 0.005,
  },
})
export default React.memo(MatchList);
