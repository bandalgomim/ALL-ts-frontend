import React, { useCallback, useRef, useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MatchBar from './matchBar';
import { matchListDto, matchDto } from '@model/main.dto';
import { height, width } from '@/global';
import AdmobNativeAdSmall from '@components/ad/smallBanner';

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
  scrollEventThrottle = 16,
  headerHeight,
}) => {
  const initialDateState = useMemo(
    () => Object.fromEntries(Object.keys(matchList).map((key) => [key, false])),
    [matchList]
  );
  const [dateScore, setDateScore] = useState<Record<string, boolean>>(initialDateState);
  const flatListRef = useRef<FlatList>(null);
  useLayoutEffect(() => {
    setDateScore(initialDateState);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
    matchCountRef.current = 0;
    const rafId = requestAnimationFrame(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: false });
      }
      matchCountRef.current = 0;
    });
    return () => cancelAnimationFrame(rafId);
  }, [initialDateState]);
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST
  const today = kst.toISOString().split('T')[0]; //

  const matchCountRef = useRef(0);
  const adBanner  = (color: string, count: number) => {
    if (count % 10 === 0) {
      return <AdmobNativeAdSmall color={color}/>;
    }
  };
  const onPressScore = (date: string) => {
    setDateScore(prev => {
      const newState = { ...prev, [date]: !prev[date] };
      console.log('✅ dateScore updated:', newState);
      return newState;
    });
  };
  const renderItem = useCallback(({ item, index }: { item: matchDto[], index: number }) => {
    const sortedItems = [...item].sort((a, b) => a.matchTime.localeCompare(b.matchTime));
    let dateColor = color;
    let colorBar;
    if (sortedItems[0]?.matchDate === today) {
      dateColor = '#EA5579';
      colorBar = 'red';
    } else if (color === 'blue') {
      dateColor = '#30397A';
      colorBar = 'blue';
    } else{
      colorBar = 'white';
    }
    return (
      <View style={styles.itemContainer}>
        <View style={styles.dateRow}>
          <View
            style={[
              styles.frontDateBar,
              { backgroundColor: dateColor },
            ]}
          />
          <View>
            <Text
              style={[
                styles.dateText,
                { color: dateColor },
              ]}
            >
              {sortedItems[0].matchDate}
            </Text>
          </View>
          <View
            style={[
              styles.backDateBar,
              { backgroundColor: dateColor },
            ]}
          />
          <View>
            <TouchableOpacity
              onPress={()=>{onPressScore(sortedItems[0].matchDate);}}
            >
              <Text
                style={[
                  styles.scoreText,
                  { color: dateColor },
                ]}
              >all score</Text>
            </TouchableOpacity>
          </View>
        </View>
        {sortedItems.map((data: matchDto) => {
          matchCountRef.current += 1;
          const matchCount = matchCountRef.current;
          return (
          <View key={data.matchId}>
            <MatchBar key={data.matchId} match={data} color={colorBar} scoreState={dateScore[data.matchDate]} />
          </View>
        );})}
      </View>
    );
  }, [color, today, dateScore]);

  return (
    <FlatList
      ref={flatListRef}
      style={styles.flatList}
      data={Object.values(matchList)}
      renderItem={renderItem}
      ListHeaderComponent={() => (headerHeight ? <View style={[styles.listHeader, { height: height * headerHeight }]} /> : null)}
      ListFooterComponent={() => (
        <>
          {(headerHeight ? <View style={styles.listFooter} /> : null)}
        </>
      )}
      initialScrollIndex={0}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
      keyExtractor={(item, index) => `match-group-${index}-${item[0]?.matchId || index}`}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginTop: -height * 0.015,
  },
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
  scoreText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    marginLeft: width * 0.01,
    fontSize: width * 0.05,
    textAlign: 'center',
    marginBottom: -height * 0.00,
  },
  backDateBar: {
    width: width * 0.42,
    height: height * 0.005,
    borderRadius: 10,
    marginTop: height * 0.011,
  },
  itemContainer: {
    marginBottom: height * 0.01,
  },
  dateRow: {
    flexDirection: 'row',
  },
  listHeader: {
    alignItems: 'center',
  },
  listFooter: {
    height: height * 0.17,
    alignItems: 'center',
  },
});

export default React.memo(MatchList);
