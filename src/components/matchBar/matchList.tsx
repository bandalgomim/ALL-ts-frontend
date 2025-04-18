import React, { useCallback  } from 'react';
import {  FlatList } from 'react-native';
import MatchBar  from './matchBar';
import { matchDto } from '../../model/main.dto';
import { binarySearchClosestMatch } from './utils';
import { height } from '../../global';

interface ContentsProps {
  matchList: matchDto[],
  color: string;
}

const MatchList: React.FC<ContentsProps> = ( { matchList, color } ) => {
  const ITEM_HEIGHT = height * 0.1;
  const initIndex = matchList.length >= 5 ? binarySearchClosestMatch(matchList) : 0;
  const renderItem = useCallback(( {item}: { item: matchDto } ) => {
    return (
      <MatchBar
        isVisible={null}
        setIsVisible={null}
        match={item}
        color={color}
      />
    );
  }, [color]);
  return (
    <>
    <FlatList
      style={{ marginTop: -height * 0.015 }}
      data={matchList}
      keyExtractor={(item) => item.matchId.toString()}
      renderItem={renderItem}
      initialScrollIndex={initIndex}
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

export default React.memo(MatchList);
