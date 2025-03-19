import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, NativeMethods } from 'react-native';
import { match } from '../../model/main.dto';
import { MatchBar } from './matchBar';

interface MyComponentProps {
  matchList: match[];
}

const MyComponent: React.FC<MyComponentProps> = ({ matchList }) => {
  const scrollViewRef = useRef<FlatList>(null);
  const matchRefs = useRef<(View & NativeMethods)[]>([]); // View와 NativeMethods를 모두 포함한 타입
  const [nearestMatchIndex, setNearestMatchIndex] = useState<number | null>(null);

  // 현재 시간과 가장 가까운 매치 찾기
  const getNearestMatchIndex = () => {
    const now = new Date();
    let closestIndex: number | null = null;
    let closestTimeDiff = Infinity; // 가장 작은 시간 차이를 저장

    matchList.forEach((match, index) => {
      const matchDate = new Date(match.matchDate); // matchDate를 Date 객체로 변환
      const timeDiff = Math.abs(matchDate.getTime() - now.getTime()); // 시간 차이 계산

      if (timeDiff < closestTimeDiff) {
        closestTimeDiff = timeDiff;
        closestIndex = index; // 가장 가까운 매치의 인덱스 업데이트
      }
    });

    setNearestMatchIndex(closestIndex); // 가장 가까운 매치의 인덱스를 상태로 저장
  };

  useEffect(() => { 
    if (matchList?.length) {
      getNearestMatchIndex(); // 컴포넌트가 렌더링될 때 가장 가까운 매치를 찾음
    }
  }, [matchList]);

  // 스크롤을 중앙으로 이동시키는 함수
  const scrollToNearestMatch = (index: number) => {
    if (index !== null && matchRefs.current[index]) {
      const matchRef = matchRefs.current[index];

      // measureLayout 호출 전에 matchRef가 제대로 정의되어 있는지 체크
      if (matchRef && matchRef.measureLayout) {
        matchRef.measureLayout(
          (x: number, y: number, width: number, height: number) => {
            const offset =
              y -
              (scrollViewRef.current?.contentOffset?.y || 0) -
              (scrollViewRef.current?.layoutMeasurement?.height || 0) / 2 +
              height / 2;
            scrollViewRef.current?.scrollTo({ y: offset, animated: true });
          },
          () => {}
        );
      }
    }
  };

  useEffect(() => {
    if (nearestMatchIndex !== null) {
      scrollToNearestMatch(nearestMatchIndex); // 가장 가까운 매치로 스크롤 이동
    }
  }, [nearestMatchIndex]);

  const renderItem = ({ item, index }: { item: match; index: number }) => (
    <View ref={(el) => (matchRefs.current[index] = el as View & NativeMethods)}>
      <MatchBar match={item} color={'white'} />
    </View>
  );

  return (
    <FlatList
      ref={scrollViewRef}
      data={matchList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={{ paddingTop: 5 }}
    />
  );
};

export default MyComponent;
