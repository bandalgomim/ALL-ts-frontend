import React, { useContext, useEffect, useRef, useState } from 'react';
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
const DISMISS_THRESHOLD = 100; // 모달이 닫히는 드래그 거리 임계값

const MatchModal: React.FC = () => {
  const { modalVisible, setModalVisible, modalContents, setModalContents } = useContext(ModalContext);
  const safemodalContents = modalContents || {};

  // 애니메이션 값 설정
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0.5)).current;
  
  // 드래그 중인지 여부 상태
  const [isDragging, setIsDragging] = useState(false);
  
  // 마지막 드래그 위치 추적
  const lastDragPos = useRef(0);

  // 모달 닫기 함수
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setModalVisible(false);
      setModalContents(null);
    });
  };

  // 모달 열기/닫기 애니메이션
  useEffect(() => {
    if (modalVisible) {
      // 모달 열기 애니메이션 (기존 코드 유지)
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
      
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else if (translateY._value === 0) {
      // 모달이 열려있는 상태에서 닫힐 때만 애니메이션 실행
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [modalVisible, translateY]);

  // 모달 헤더(핸들바 포함)를 위한 PanResponder
  const modalHeaderPanResponder = useRef(
    PanResponder.create({
      // 터치 시작 시
      onStartShouldSetPanResponder: () => true,
      
      // 움직임 시작 시
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      
      // 패널 포착 시 상태 초기화
      onPanResponderGrant: () => {
        setIsDragging(true);
        lastDragPos.current = 0;
        translateY.setOffset(0);
        translateY.setValue(0);
      },
      
      // 드래그 중 실시간 업데이트
      onPanResponderMove: (_, gestureState) => {
        // 아래로만 드래그 가능
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          lastDragPos.current = gestureState.dy;
          
          // 드래그에 따른 백드롭 투명도 조정
          const newOpacity = Math.max(0, 0.5 - (gestureState.dy / 300));
          backdropOpacity.setValue(newOpacity);
        }
      },
      
      // 드래그 종료 시
      onPanResponderRelease: () => {
        setIsDragging(false);
        
        // 임계값 이상 드래그 시 모달 닫기
        if (lastDragPos.current > DISMISS_THRESHOLD) {
          closeModal();
        } else {
          // 아니면 원위치로 복귀
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              tension: 80,
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
      
      // 터치 취소 시
      onPanResponderTerminate: () => {
        setIsDragging(false);
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            tension: 80,
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
        {/* 모달 헤더 - 핸들바 포함 (드래그 가능) */}
        <View
          style={styles.modalHeader}
          {...modalHeaderPanResponder.panHandlers}
        >
          <View style={styles.handleContainer}>
            <View style={styles.handleBar} />
          </View>
          <Text style={styles.text}>matchs of day</Text>
        </View>
        
        {/* 컨텐츠 영역 - MatchList (드래그 불가) */}
        <View style={styles.contentContainer}>
          {modalContents && Object.keys(safemodalContents).length > 0 ? (
            <View style={styles.matchListWrapper}>
              <MatchList matchList={safemodalContents} color="blue" />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={{ color: '#30397A', fontSize: 16 }}>No matches available</Text>
            </View>
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
    overflow: 'hidden',
  },
  // 모달 헤더 영역 (드래그 가능)
  modalHeader: {
    width: '100%',
    paddingTop: height* 0.005,
    alignItems: 'center',
    backgroundColor: 'white', // 배경색 설정
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // 드래그 영역임을 알리는 약간의 그림자 효과
    zIndex: 10,
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.005,
    marginBottom: height * 0.005,
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
  // 컨텐츠 영역 (드래그 불가)
  contentContainer: {
    flex: 1,
    width: '100%',
    marginTop: height * 0.01,
    alignItems: 'center', // 컨텐츠 중앙 정렬 추가
  },
  // MatchList를 감싸는 컨테이너 추가
  matchListWrapper: {
    width: width * 0.95, // 약간의 여백을 두고 중앙 정렬
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(MatchModal);
