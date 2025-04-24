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
const DISMISS_THRESHOLD = 100; // 모달이 닫히는 드래그 거리 임계값

const SearchModal: React.FC = () => {
  const { searchVisible, setSearchVisible } = useContext(ModalContext);
  const [query, setQuery] = useState<string>('');
  const [filteredTeams, setFilteredTeams] = useState<filteredItems[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  
  // 드래그 중인지 상태 추가
  const [isDragging, setIsDragging] = useState(false);

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
      .filter(t => t.keyword.some(k => {
        const lowerK = k.toLowerCase();
        
        // 첫 글자가 같은 경우
        const startsWithQuery = lowerK.startsWith(lowerQuery);
        
        // 연속된 3글자 이상 일치하는 경우
        const hasThreeConsecutiveChars = lowerQuery.length >= 3 && lowerK.includes(lowerQuery);
        
        return startsWithQuery || hasThreeConsecutiveChars;
      }))
      .map(t => ({ name: t.keyword[0], teamId: t.teamId, leagueId: t.leagueId }));
      
    setFilteredTeams(results);
  };

  const renderItem = ({ item }: { item: filteredItems }) => {
    return (
      <TouchableOpacity onPress={() => {
        if (item.teamId) { navigateTeam(item.teamId); }
        else if (item.leagueId) { navigateLeague(item.leagueId); }
      }}>
        <Text style={[styles.serchText, styles.resultText]} numberOfLines={1}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // 애니메이션 값
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // 모달 오픈/닫힘 애니메이션
  useEffect(() => {
    if (searchVisible) {
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
  }, [searchVisible, translateY, backdropOpacity]);

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
      setSearchVisible(false);
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
      visible={searchVisible}
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
          <View style={{ width: '100%', height: '100%' }} />
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
    height: height * 0.42,
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
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  dragBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
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
  serchText: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
  },
  resultText: {
    fontSize: width * 0.07,
    width: width * 0.50,
    textAlign: 'left',
    marginVertical: 6,
  },
  noResultText: {
    fontFamily: 'sb-it-ver1',
    color: '#999',
    fontSize: width * 0.05,
    marginTop: 10,
    textAlign: 'center',
  },
  emptyResultContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default React.memo(SearchModal);
