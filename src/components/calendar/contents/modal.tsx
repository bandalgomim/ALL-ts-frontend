/* eslint-disable react/react-in-jsx-scope */
import {  View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { matchDto } from '../../../model/main.dto';
import Modal from 'react-native-modal';
import MatchList from '../../matchBar/matchList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { width, height } from '../../../global';

interface  MatchModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    matchList: matchDto[] | null
  }

const MatchModal: React.FC< MatchModalProps> = ({ isVisible, setIsVisible, matchList }) => {
  
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)} // 바깥 터치 시 닫기
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
    >
      <View style={[styles.modalView, { width: width * 1, height: height * 0.5 }]}>
      <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
      }}
      onPress={() => setIsVisible(false)} // 버튼 클릭 시 실행되는 함수
    >
      <Icon
        name="close"  // 아이콘 이름 (Ionicons의 close 아이콘)
        size={width * 0.1}
        color="black"
      />
    </TouchableOpacity>
        <MatchList
          matchList={matchList as matchDto[]}
          color={'blue'}
        />
      </View>
    </Modal>);
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
      justifyContent: 'center',
    },
    scrollView: {
      paddingTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default MatchModal;
