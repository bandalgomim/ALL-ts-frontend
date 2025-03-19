import React, { useState } from "react";
import { View, TextInput, Text, FlatList, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { searchItem } from "../model/searchIteam";

interface  searchModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
  }

const SearchModal: React.FC< searchModalProps> = ({ isVisible, setIsVisible }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredTeams, setFilteredTeams] = useState<string[]>([]);
  
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
      .map(t => t.keyword[0]);
    
    setFilteredTeams(results);
  };
  
  return (
    <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)} // 바깥 터치 시 닫기
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
    >
        <View>
            <TextInput
                value={query}
                onChangeText={handleSearch}
                placeholder="SEARCH"
                style={styles.textInput}
            />
            {filteredTeams.length > 0 ? (
                <FlatList
                data={filteredTeams}
                keyExtractor={(id) => id.toString()}
                renderItem={({ item }) => <Text>{item}</Text>}
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
    textInput: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      opacity: 1,
      paddingTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
})

export default SearchModal;