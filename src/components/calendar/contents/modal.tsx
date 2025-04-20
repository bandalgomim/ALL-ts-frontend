
import { useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Modal from 'react-native-modal'; // react-native-modal 임포트

import { width, height } from '../../../global';
import { ModalContext } from '../../../context/modal.context';
import React from 'react';
import MatchList from '../../matchBar/matchList';


const MatchModal: React.FC = () => {
  // 안전한 modalContents 생성 (null 처리)
  const {modalVisible, setModalVisible, modalContents, setModalContents } = useContext(ModalContext);
  const safemodalContents = modalContents || [];
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => {setModalVisible(false); setModalContents(null);}}
      onModalHide={() => {setModalVisible(false); setModalContents(null);}}
      onBackButtonPress={() => {setModalVisible(false); setModalContents(null);}}
      onSwipeComplete={() => {setModalVisible(false); setModalContents(null);}}

      useNativeDriver={true} // 명시적 true 설정
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      style={styles.modal}
      backdropOpacity={0.5}
      hideModalContentWhileAnimating={true} // 명시적 true 설정
      propagateSwipe={true} // 스와이프 제스처 전파 추가
    >
      <View style={styles.modalContent}>
        <View style={styles.handleBar} />
        <Text style={styles.text}>matchs of day</Text>
        {safemodalContents.length > 0 ? (
          <MatchList matchList={safemodalContents} color="blue" />
        ) : (
          <View style={styles.emptyContainer} />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: width,
    height: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
    marginBottom: 10,
  },
  text: {
    fontSize: width * 0.09,
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
MatchModal.whyDidYouRender = true;
export default React.memo(MatchModal);
