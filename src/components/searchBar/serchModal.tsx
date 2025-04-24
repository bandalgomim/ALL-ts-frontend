import React, { useContext, useState, useRef, useEffect } from 'react';
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
import { searchItem } from '../../model/searchIteam';
import { useNavigation } from '@react-navigation/native';
import { LeaguePageParamList, TeamPageParamList } from '../../model/navigation.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '../../global';
import { ModalContext } from '../../context/modal.context';

interface filteredItems {
  name: string;
  teamId: number | undefined;
  leagueId: number | undefined;
}

const SCREEN_HEIGHT = height;

const SearchModal: React.FC = () => {
  const { searchVisible, setSearchVisible } = useContext(ModalContext);
  const [query, setQuery] = useState<string>('');
  const [filteredTeams, setFilteredTeams] = useState<filteredItems[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigationLeague = useNavigation<StackNavigationProp<LeaguePageParamList>>();
  const navigateTeam = (teamId: number) => {
    setSearchVisible(false);
    setQuery('');
    setFilteredTeams([]);
    setIsFocused(false);
    navigationTeam.navigate('TeamScreen', { teamId: teamId });
  };
  const navigateLeague = (leagueId: number) => {
    setSearchVisible(false);
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
    const lowerQuery = input.toLowerCase();
    const results = searchItem
      .filter(t => t.keyword.some(k => k.toLowerCase().includes(lowerQuery)))
      .map(t => ({ name: t.keyword[0], teamId: t.teamId, leagueId: t.leagueId }));
    setFilteredTeams(results);
  };
  const renderItem = ({ item }: { item: filteredItems }) => {
    return (
      <TouchableOpacity onPress={() => {
        if (item.teamId) { navigateTeam(item.teamId); }
        else if (item.leagueId) { navigateLeague(item.leagueId); }
      }}>
        <Text style={[styles.serchText, styles.resultText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // 애니메이션 값 - 모달과 백드롭 분리
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current; // 백드롭 투명도 추가

  // 모달 오픈/닫힘 애니메이션 - 백드롭 통합
  useEffect(() => {
    if (searchVisible) {
      // 백드롭과 모달 동시에 애니메이션 - 백드롭은 더 천천히
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 350, // 백드롭 천천히 나타남 (모달보다 조금 더 길게)
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // 모달 닫힐 때는 현재와 동일하게 유지
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 150, // 백드롭 빠르게 사라짐
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 300, // 모달은 정상 속도로 사라짐
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [searchVisible, translateY, backdropOpacity]);

  // 닫기 함수 수정 - 백드롭 애니메이션 추가
  const closeModal = () => {
    // 백드롭 빠르게 사라지게 함
    Animated.timing(backdropOpacity, {
      toValue: 0,
      duration: 150, // 백드롭 빠르게 사라짐
      useNativeDriver: true,
    }).start();

    // 모달은 정상 속도로 사라짐
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSearchVisible(false);
      setQuery('');
      setFilteredTeams([]);
      setIsFocused(false);
      Keyboard.dismiss();
    });
  };

  // 아래로 스와이프 시 닫기
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // handleBar 영역 내에서만 panResponder 동작
  const handleBarPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      visible={searchVisible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      {/* 백드롭 - Animated.View로 변경 */}
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: backdropOpacity }, // 애니메이션 적용된 투명도
        ]}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{ width: '100%', height: '100%' }} />
        </TouchableWithoutFeedback>
      </Animated.View>
      
      {/* 슬라이드 모달 */}
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY }] },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.handleContainer}
          onPress={closeModal}
          {...handleBarPanResponder.panHandlers}
        >
          <View style={styles.handleBar} />
        </TouchableOpacity>
        <View style={[styles.modalView]}>
          <ImageBackground
            resizeMode="contain"
            style={styles.textBackground}
            source={require('../../assets/searchBar/modal.png')}
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
          {filteredTeams.length > 0 ? (
            <FlatList
              data={filteredTeams}
              keyExtractor={(item) => item.name.toString()}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            query ? <Text style={styles.noResultText}>검색 결과 없음</Text> : null
          )}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  animatedContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.25,
    width: width,
    height: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  handleContainer: {
    width: width * 0.4,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -height * 0.02,
    marginBottom: -height * 0.02,
  },
  handleBar: {
    width: width * 0.2,
    height: height * 0.007,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
  },
  modalView: {
    width: width * 0.85,
    height: height * 0.42,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.01,
  },
  textBackground: {
    alignItems: 'center',
    width: width * 0.5,
    height: height * 0.07,
    marginTop: -height * 0.015,
    justifyContent: 'center',
  },
  textInput: {
    fontFamily: 'sb-it-ver1',
    alignItems: 'center',
    textAlign: 'center',
    color: '#30397A',
    fontSize: width * 0.07,
    width: width * 0.3,
    height: height * 0.06,
  },
  serchText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
  },
  resultText: {
    fontSize: width * 0.06,
    width: width * 0.43,
    textAlign: 'center',
    marginVertical: 6,
  },
  noResultText: {
    fontFamily: 'sb-it-ver1',
    color: '#999',
    fontSize: width * 0.05,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default React.memo(SearchModal);
