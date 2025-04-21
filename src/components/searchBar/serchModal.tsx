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

  // 애니메이션 값
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // 모달 오픈/닫힘 애니메이션
  useEffect(() => {
    if (searchVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [searchVisible, translateY]);

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

  const closeModal = () => {
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

  return (
    <Modal
      visible={searchVisible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      {/* 백드롭 */}
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      {/* 슬라이드 모달 */}
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY }] },
        ]}
      >
        <View style={styles.handleBar} {...handleBarPanResponder.panHandlers} />
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
    opacity: 0.5,
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
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
    marginBottom: 10,
    marginTop: 8,
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
    marginTop: height * 0.015,
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
