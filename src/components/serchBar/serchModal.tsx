import React, { useState } from "react";
import { View, TextInput, Text, FlatList, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { searchItem } from "../../model/searchIteam";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TeamPageParamList } from "../../model/navigation.dto";

interface  searchModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
  }

interface filteredItems {
  name: string;
  teamId: number
}

const SearchModal: React.FC< searchModalProps> = ({ isVisible, setIsVisible }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredTeams, setFilteredTeams] = useState<filteredItems[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation<NavigationProp<TeamPageParamList>>();
  const navigateTeam = (teamId: number) => {
    setIsVisible(false);
    navigation.navigate("TeamScreen", { teamId: teamId });
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
      .map(t => ({name: t.keyword[0], teamId: t.teamId}));
    
    setFilteredTeams(results);
  };
  
  return (
    <Modal
      isVisible={isVisible}
      
      onBackdropPress={() => {setIsVisible(false); setQuery(""); setFilteredTeams([]), setIsFocused(false)}} // 바깥 터치 시 닫기
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
    >
      <View style={[styles.modalView, { width: width*0.85, height: height*0.5, opacity: 1}]}>
        <ImageBackground
          resizeMode="contain" 
          style={[styles.textBackground, {width:width*0.5, height:height*0.07, marginTop: height*0.015}]}
          source={require('../../assets/searchBar/modal.png')}
        >
          <TextInput
            placeholder={isFocused ? "" : "SEARCH"} // 포커스되면 placeholder 제거
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={query}
            onChangeText={handleSearch}
            style={[styles.textInput, { fontSize: width*0.07, width:width*0.3, height:height*0.06, }]}
          />
        </ImageBackground>

        {filteredTeams.length > 0 ? (
          <FlatList
          data={filteredTeams}
          keyExtractor={(item) => item.teamId.toString()} // item을 key로 지정
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{navigateTeam(item.teamId)}}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
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
      margin: 0
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      alignItems: 'center',
      //justifyContent: 'center',
    },
    textBackground: {
      alignItems: "center", 
    },
    textInput: {
      fontFamily: 'built titling sb it',
      alignItems: 'center',
      textAlign: "center",
      color: "#30397A",
    },
    scrollView: {
      opacity: 1,
      paddingTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
})

export default SearchModal;