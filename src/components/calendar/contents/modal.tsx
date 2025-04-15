/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { matchDto } from '../../../model/main.dto';
import MatchList from '../../matchBar/matchList';
import { width, height } from '../../../global';

interface MatchModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  matchList: matchDto[] | null;
}

const MatchModal: React.FC<MatchModalProps> = ({ isVisible, setIsVisible, matchList }) => {
  const slideAnim = useRef(new Animated.Value(height)).current; // 처음에는 화면 아래쪽

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: height * 0.25, // 원하는 위치로 슬라이드
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height, // 다시 아래로
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={() => setIsVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalView, { top: slideAnim }]}>
              <Text style={styles.text}>matchs of day</Text>
              <MatchList matchList={matchList as matchDto[]} color="blue" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // fade로 자연스럽게
    justifyContent: 'flex-end', // 아래에서 슬라이드되도록
  },
  modalView: {
    position: 'absolute',
    width: width,
    height: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: height * 0.01,
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
});

export default MatchModal;
