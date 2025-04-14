import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet,  ImageBackground, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { searchItem } from '../../model/searchIteam';
import { useNavigation } from '@react-navigation/native';
import { LeaguePageParamList, TeamPageParamList } from '../../model/navigation.dto';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '../../global';

interface  searchModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
  }

interface filteredItems {
  name: string;
  teamId: number | undefined;
  leagueId: number | undefined;
}

const SearchModal: React.FC< searchModalProps> = ({ isVisible, setIsVisible }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredTeams, setFilteredTeams] = useState<filteredItems[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  

  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigationLeague = useNavigation<StackNavigationProp<LeaguePageParamList>>();
  const navigateTeam = (teamId: number) => {
    setIsVisible(false);
    setQuery('');
    setFilteredTeams([]);
    setIsFocused(false);
    navigationTeam.replace('TeamScreen', { teamId: teamId });
  };
  const navigateLeague = (leagueId: number) => {
    setIsVisible(false);
    setQuery('');
    setFilteredTeams([]);
    setIsFocused(false);
    navigationLeague.replace('LeagueScreen', { leagueId: leagueId });
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
      .map(t => ({name: t.keyword[0], teamId: t.teamId, leagueId: t.leagueId}));
    setFilteredTeams(results);
  };
  const renderItem = ({ item }: { item:filteredItems }) => {
    return (
      <TouchableOpacity onPress={()=>{
        if (item.teamId) {navigateTeam(item.teamId);}
        else if (item.leagueId) {navigateLeague(item.leagueId);}
      }}>
        <Text style={[styles.serchText, {fontSize: width * 0.06, width: width * 0.43}]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleBackdropPress = () => {
    if (isVisible) {
      setIsVisible(false);
      setQuery(''); 
      setFilteredTeams([]); 
      setIsFocused(false);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleBackdropPress}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
      animationInTiming={300} // 애니메이션 시간 설정
      animationOutTiming={300}
      backdropTransitionInTiming={300} // 백드롭 애니메이션 시간
      backdropTransitionOutTiming={300}
      backdropOpacity={0.5}
      backdropColor="black"
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      avoidKeyboard={true} // 키보드 피하기
      >
      <View style={[styles.modalView, { width: width * 0.85, height: height * 0.5 }]}>
        <ImageBackground
          resizeMode="contain"
          style={[styles.textBackground, {width:width * 0.5, height:height * 0.07, marginTop: height * 0.015}]}
          source={require('../../assets/searchBar/modal.png')}
        >
          <TextInput
            placeholder={isFocused ? '' : 'SEARCH'} // 포커스되면 placeholder 제거
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={query}
            onChangeText={handleSearch}
            style={[styles.textInput, { fontSize: width * 0.07, width:width * 0.3, height:height * 0.06 }]}
          />
        </ImageBackground>

        {filteredTeams.length > 0 ? (
          <FlatList
          data={filteredTeams}
          keyExtractor={(item) => item.name.toString()} // item을 key로 지정
          renderItem={renderItem}
        />
        ) : (
          query ? <Text>검색 결과 없음</Text> : null
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      //justifyContent: 'center',
    },
    textBackground: {
      alignItems: 'center',
    },
    textInput: {
      fontFamily: 'sb-it-ver1',
      alignItems: 'center',
      textAlign: 'center',
      color: '#30397A',
    },
    scrollView: {
      paddingTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    serchText:{
      fontFamily: 'sb-it-ver1',
      color: '#30397A',
    },
});

export default React.memo(SearchModal);
