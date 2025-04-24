import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { width, height } from '../../../global';
import { ModalContext } from '../../../context/modal.context';
import MatchList from '../../matchBar/matchList';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const MatchModal: React.FC = () => {
  const { modalVisible, setModalVisible, modalContents, setModalContents } = useContext(ModalContext);
  const safemodalContents = modalContents || [];

  // 애니메이션 값 - 모달과 백드롭 분리
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current; // 백드롭 투명도용 별도 값

  // 모달 오픈/닫힘 애니메이션 
  useEffect(() => {
    if (modalVisible) {
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
      ]).start(({ finished }) => {
        if (finished) {
          setModalVisible(false);
          setModalContents(null);
        }
      });
    }
  }, [modalVisible, translateY, backdropOpacity]);

  // 닫기 함수 수정
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
      setModalVisible(false);
      setModalContents(null);
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

  // 아래로 스와이프 시 닫기 (handleBar에서만 동작)
  const handleBarRef = useRef<View>(null);

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
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      {/* 백드롭에 애니메이션 적용 */}
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
        <Text style={styles.text}>matchs of day</Text>
        {safemodalContents ? (
          <MatchList matchList={safemodalContents} color="blue" />
        ) : (
          <View style={styles.emptyContainer} />
        )}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    // opacity는 애니메이션으로 제어
  },
  animatedContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.25, // 화면 중간에 위치하도록 추가 (0.25~0.5는 필요에 따라 조정)
    width: width,
    height: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  handleContainer: {
    //borderWidth: 1,
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

export default React.memo(MatchModal);
