import React, { useCallback, useRef, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MatchBar from './matchBar';
import { matchListDto, matchDto } from '../../model/main.dto';
import { height, width } from '../../global';

interface ContentsProps {
  matchList: matchListDto,
  color: string;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
  headerHeight?: number;
}

const MatchList: React.FC<ContentsProps> = ({
  matchList,
  color,
  onScroll,
  scrollEventThrottle = 16,                  // 기본값 설정
  headerHeight
}) => {
  const flatListRef = useRef<FlatList>(null);

  useLayoutEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
    const rafId = requestAnimationFrame(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: false });
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [matchList]);

  const renderItem = useCallback(({ item }: { item: matchDto[] }) => (
    <View style={{ marginBottom: height * 0.01 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.frontDateBar, { backgroundColor: color === 'white' ? 'white' : '#30397A' }]} />
        <View>
          <Text style={[styles.dateText, { color: color === 'white' ? 'white' : '#30397A' }]}>
            {item[0].matchDate}
          </Text>
        </View>
        <View style={[styles.backDateBar, { backgroundColor: color === 'white' ? 'white' : '#30397A' }]} />
      </View>
      {item.map((data: matchDto) => (
        <MatchBar
          key={data.matchId}
          match={data}
          color={color}
        />
      ))}
    </View>
  ), [color]);

  return (
    <FlatList
      ref={flatListRef}
      style={{ marginTop: -height * 0.015 }}
      data={Object.values(matchList)}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        headerHeight ? <View style={{ height: height * headerHeight, alignItems: 'center' }}>
          
        </View> : <></>
      )}
      initialScrollIndex={0}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
      keyExtractor={(item, index) => `match-group-${index}-${item[0]?.matchId || index}`}
      onScroll={onScroll}                         // 추가
      scrollEventThrottle={scrollEventThrottle}   // 추가
    />
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
});

export default React.memo(MatchList);
