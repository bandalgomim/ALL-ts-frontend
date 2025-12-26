import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LeaguePageParamList, TeamPageParamList } from '@model/navigation.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '@/global';
import { useSearchActions, useSearchState } from '@context/modal/search.context';
import { useSearchTagState } from '@context/searchTag.context';
import { PostState } from '@model/config';

interface filteredItems {
  name: string;
  teamId: number | undefined;
  leagueId: number | undefined;
}

const SCREEN_HEIGHT = height;
const DISMISS_THRESHOLD = 100; // 모달이 닫히는 드래그 거리 임계값

const SearchModal: React.FC = () => {

  const { close } = useSearchActions();
  const { visible } = useSearchState();
  const [query, setQuery] = useState<string>('');
  const [filteredTeams, setFilteredTeams] = useState<filteredItems[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchTagRes  = useSearchTagState() as PostState<filteredItems>;

  // 드래그 중인지 상태 추가
  const [_isDragging, setIsDragging] = useState(false);

  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigationLeague = useNavigation<StackNavigationProp<LeaguePageParamList>>();
  const navigateTeam = (teamId: number) => {
    close();
    setQuery('');
    setFilteredTeams([]);
    setIsFocused(false);
    navigationTeam.navigate('TeamScreen', { teamId: teamId });
  };
  const navigateLeague = (leagueId: number) => {
    close();
    setQuery('');
    setFilteredTeams([]);
    setIsFocused(false);
    navigationLeague.navigate('LeagueScreen', { leagueId: leagueId });
  };

  // 검색 실행 함수
  const handleSearch = (input: string) => {
    setQuery(input);
    if (!input) {
      setFilteredTeams([]);
      return;
    }

// 1) data를 항상 배열로 정규화
const items = Array.isArray(searchTagRes?.data)
  ? searchTagRes.data
  : searchTagRes?.data
    ? Object.values(searchTagRes.data)
    : [];

// 2) 입력 정규화
const lowerQuery = String(input ?? '').trim().toLowerCase();

// 3) 빈 쿼리는 바로 빈 결과(원하면 인기검색어 등 리턴)
if (!lowerQuery) {
  // setFilteredResults([]) 같은 처리
}

// 4) 안전 가드 + 필터 + 매핑
const filteredResults = items
  .filter((t: any) => t && typeof t.tag === 'string' && t.tag.length > 0)
  .filter((t: any) => {
    const lowerTag = t.tag.toLowerCase();
    const startsWithQuery = lowerTag.startsWith(lowerQuery);
    const hasThreeConsecutiveChars =
      lowerQuery.length >= 3 && lowerTag.includes(lowerQuery);
    return startsWithQuery || hasThreeConsecutiveChars;
  })
  .map((t: any) => ({
    name: t.itemName ?? t.tag ?? '',
    teamId: t.teamId ?? undefined,
    leagueId: t.leagueId ?? undefined,
  }));


    // 중복 제거 로직 추가: item_name이 동일하면서 teamId 또는 leagueId가 같은 항목은 하나만 유지
    const uniqueResults: filteredItems[] = [];
    const seenItems = new Set<string>();

    filteredResults.forEach(item => {
      // teamId 또는 leagueId 기준으로 고유 키 생성
      const key = `${item.name}_${item.teamId || ''}_${item.leagueId || ''}`;
      if (!seenItems.has(key)) {
        seenItems.add(key);
        uniqueResults.push(item);
      }
    });

    setFilteredTeams(uniqueResults);
  };

  // 언어별 스타일만 리턴

  // 한 줄로, 말줄임표 적용하여 렌더
  const renderItem = ({ item }: { item: filteredItems }) => {
    const parts = item.name.split(' ').filter(Boolean);
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.teamId) {navigateTeam(item.teamId);}
          else if (item.leagueId) {navigateLeague(item.leagueId);}
        }}
      >
        <View style={styles.resultItemContainer}>
          <Text
            style={styles.inlineBase}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {parts.map((p, i) => (
              <Text key={`${p}-${i}`} style={styles.inline}>
                {p}{i < parts.length - 1 ? ' ' : ''}
              </Text>
            ))}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // 애니메이션 값
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // 모달 오픈/닫힘 애니메이션
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, backdropOpacity]);

  // 닫기 함수 수정 - 백드롭 애니메이션 추가
  const closeModal = () => {
    Animated.timing(backdropOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      close();
      setQuery('');
      setFilteredTeams([]);
      setIsFocused(false);
      Keyboard.dismiss();
    });
  };

  // 드래그 핸들러 개선
  const modalPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10 && Math.abs(gestureState.dx) < 20;
      },
      onPanResponderGrant: () => {
        setIsDragging(true);
        translateY.setOffset(0);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          const newOpacity = Math.max(0, 0.5 - (gestureState.dy / 300));
          backdropOpacity.setValue(newOpacity);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        setIsDragging(false);
        if (gestureState.dy > DISMISS_THRESHOLD) {
          closeModal();
        } else {
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              tension: 70,
              friction: 12,
              useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
              toValue: 0.5,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            tension: 70,
            friction: 12,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: backdropOpacity },
        ]}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.backdropTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY }] },
        ]}
      >
        <View
          style={styles.handleContainer}
          {...modalPanResponder.panHandlers}
        >
          <View style={styles.handleBar} />
        </View>

        <View style={styles.modalView}>
          <ImageBackground
            resizeMode="contain"
            style={styles.textBackground}
            source={require('@assets/searchBar/modal.png')}
          >
            <TextInput
              placeholder={isFocused ? '' : 'SEARCH'}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={query}
              onChangeText={handleSearch}
              style={styles.textInput}
            />
          </ImageBackground>

          <View style={styles.resultsContainer}>
            {filteredTeams.length > 0 ? (
              <FlatList
                data={filteredTeams}
                keyExtractor={(item) => item.name.toString()}
                renderItem={renderItem}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={true}
                nestedScrollEnabled={true}
                onStartShouldSetResponderCapture={() => true}
                onMoveShouldSetResponderCapture={(evt, gestureState) => {
                  return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
                }}
                style={styles.flatList}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              query ? (
              <View style={styles.emptyResultContainer} {...modalPanResponder.panHandlers}>
                <Text style={styles.noResultText}>검색 결과 없음</Text>
              </View>
              ) : (
                <View style={styles.emptyResultContainer} {...modalPanResponder.panHandlers}>
                  <Text style={styles.noResultText}>팀 또는 리그를 검색해보세요</Text>
                </View>
              )
            )}
          </View>
        </View>

        <View
          style={styles.dragBackground}
          {...modalPanResponder.panHandlers}
        />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  backdropTouchable: {
    width: '100%',
    height: '100%',
  },
  animatedContainer: {
    position: 'absolute',
    left: width * 0.05,
    right: 0,
    top: height * 0.2,
    width: width * 0.9,
    height: height * 0.65, // 0.6 → 0.65로 증가
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  handleContainer: {
    width: width,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -height * 0.02,
    marginBottom: -height * 0.02,
    zIndex: 10,
  },
  handleBar: {
    width: width * 0.2,
    height: height * 0.007,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
  },
  modalView: {
    width: width * 0.85,
    height: height * 0.4265, // 0.42 → 0.55로 증가
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.01,
    zIndex: 5,
  },
  textBackground: {
    alignItems: 'center',
    width: width * 0.5,
    height: height * 0.07,
    marginTop: -height * 0.015,
    justifyContent: 'center',
    zIndex: 15,
  },
  resultsContainer: {
    flex: 1, // flex: 1 유지
    width: '100%',
    alignItems: 'center',
    // height 속성 제거 (flex: 1과 충돌)
    borderWidth: 0, // 경계선 제거 (디버깅용이었다면)
  },
  dragBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  flatList: {
    width: width * 0.5,
  },
  flatListContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  textInput: {
    fontFamily: 'sb-it-ver1',
    alignItems: 'center',
    textAlign: 'center',
    color: '#30397A',
    fontSize: width * 0.07,
    width: width * 0.3,
    height: height * 0.06,
    marginBottom: height * 0.015,
  },
  searchText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
  },
  resultText: {
    fontSize: width * 0.07,
    textAlign: 'left',
    marginVertical: 8, // 약간 더 넓게
    paddingLeft: width * 0.005,
    paddingRight: width * 0.005,
  },
  noResultText: {
    fontFamily: 'sb-it-ver1',
    color: '#999',
    fontSize: width * 0.07,
    marginTop: height * 0.01,
    textAlign: 'center',
  },
  emptyResultContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inlineBase: {
    fontSize: width * 0.07,
    color: '#30397A',
  },
  inline: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
  },
  inlineKR: {
    fontFamily: 'NotoSansKR-ExtraBold',
    color: '#30397A',
    lineHeight: height * 0.0375,
    fontSize: width * 0.06,
  },
  resultItemContainer: {
    width: width * 0.5,
    marginBottom: height * 0.015,
  },
});

export default React.memo(SearchModal);
