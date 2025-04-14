/* eslint-disable react/react-in-jsx-scope */
import {  View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { matchDto } from '../../../model/main.dto';
import Modal from 'react-native-modal';
import MatchList from '../../matchBar/matchList';
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
      backdropOpacity={0.5}
      backdropColor="black"
    >
      <View style={[styles.modalView, { width: width * 1, height: height * 0.5 }]}>
        <View>
          <Text style={[styles.text, {fontSize: width * 0.09, width:width, marginTop: height*0.013, marginBottom: height*0.01}]}>
            matchs of day
          </Text>
        </View>

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
    text: {
      textAlign: 'center',
      fontFamily: 'sb-it-ver1',
      color: '#30397A',
      textShadowColor: '#bdb4b4', // 그림자 색상
      textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
      textShadowRadius: 3, // 그림자 반경
    },
});

export default MatchModal;
