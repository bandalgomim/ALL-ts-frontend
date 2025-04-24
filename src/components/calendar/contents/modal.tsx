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
} from 'react-native';
import { width, height } from '../../../global';
import { ModalContext } from '../../../context/modal.context';
import MatchList from '../../matchBar/matchList';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DISMISS_THRESHOLD = 100; // 모달이 닫히는 드래그 거리 임계값

const MatchModal: React.FC = () => {
  const { modalVisible, setModalVisible, modalContents, setModalContents } = useContext(ModalContext);
  const safemodalContents = modalContents || {};

  // 애니메이션 값 - 모달과 백드롭 분리
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current; // 백드롭 투명도용 별도 값

  // 닫기 함수 
  const closeModal = () => {
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
    ]).start(() => {
      setModalVisible(false);
      setModalContents(null);
    });
  };

  // 모달 오픈/닫힘 애니메이션 
  useEffect(() => {
    if (modalVisible) {
      // 백드롭과 모달 동시에 애니메이션
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
    } 
  }, [modalVisible, translateY, backdropOpacity]);

  // 핸들바만을 위한 PanResponder
  const handleBarPanResponder = useRef(
    PanResponder.create({
      // 터치 즉시 반응
      onStartShouldSetPanResponder: () => true,
      
      // 스와이프 시작
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // 수직 방향으로 충분히 움직였을 때만 활성화
        return Math.abs(gestureState.dy) > 10;
      },
      
      // 터치 시작 시
      onPanResponderGrant: () => {
        translateY.extractOffset();
      },
      
      // 드래그 중
      onPanResponderMove: (_, gestureState) => {
        // 아래로만 드래그 허용
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          
          // 백드롭 투명도 조절
          const newOpacity = Math.max(0, 0.5 - (gestureState.dy / 300));
          backdropOpacity.setValue(newOpacity);
        }
      },
      
      // 드래그 종료
      onPanResponderRelease: (_, gestureState) => {
        // 임계값보다 많이 내렸을 때 닫기
        if (gestureState.dy > DISMISS_THRESHOLD) {
          closeModal();
        } else {
          // 원래 위치로 복귀
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
    })
  ).current;

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      {/* 백드롭 */}
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: backdropOpacity },
        ]}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{ width: width, height: height }} />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* 슬라이드 모달 */}
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY }] },
        ]}
      >
        {/* 핸들바에만 PanResponder 적용 */}
        <View 
          style={styles.handleContainer}
          {...handleBarPanResponder.panHandlers}
        >
          <View style={styles.handleBar} />
          <Text style={styles.text}>matchs of day</Text>
        </View>
        
        {/* 매치리스트는 독립적으로 스크롤 가능 */}
        <View style={styles.matchListContainer}>
          {Object.keys(safemodalContents).length > 0 ? (
            <MatchList matchList={safemodalContents} color="blue" />
          ) : (
            <View style={styles.emptyContainer} />
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
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  handleContainer: {
    width: width,  // 전체 너비로 변경하여 드래그 영역 확장
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -height * 0.02,
    marginBottom: -height * 0.02,
    zIndex: 10, // 다른 요소보다 위에 위치
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
  matchListContainer: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(MatchModal);
