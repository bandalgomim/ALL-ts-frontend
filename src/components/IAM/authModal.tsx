import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { width, height } from '../../global';
import { ModalContext } from '../../context/modal.context';

interface filteredItems {
  name: string;
  teamId: number | undefined;
  leagueId: number | undefined;
}

const SCREEN_HEIGHT = height;
const DISMISS_THRESHOLD = 100; // 모달이 닫히는 드래그 거리 임계값

const AuthModal: React.FC = () => {
  const { authVisible, setAuthVisible } = useContext(ModalContext);
  const [isFocused, setIsFocused] = useState(false);

  // 드래그 중인지 상태 추가
  const [isDragging, setIsDragging] = useState(false);

  const renderItem = ({ item }: { item: filteredItems }) => {
    const itemText = item.name.split(' ');
    return (
      <TouchableOpacity
        onPress={() => {}}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
          
        </View>
      </TouchableOpacity>
    );
  };

  // 애니메이션 값
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // 모달 오픈/닫힘 애니메이션
  useEffect(() => {
    if (authVisible) {
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
    } else {
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
      ]).start();
    }
  }, [authVisible, translateY, backdropOpacity]);

  // 닫기 함수 수정 - 백드롭 애니메이션 추가
  const closeModal = () => {
    Animated.timing(backdropOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setAuthVisible(false);
      setIsFocused(false);
      Keyboard.dismiss();
    });
  };

  // 드래그 핸들러 개선
  const modalPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10 && Math.abs(gestureState.dx) < 20;
      },
      onPanResponderGrant: () => {
        setIsDragging(true);
        translateY.setOffset(0);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          const newOpacity = Math.max(0, 0.5 - (gestureState.dy / 300));
          backdropOpacity.setValue(newOpacity);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        setIsDragging(false);
        if (gestureState.dy > DISMISS_THRESHOLD) {
          closeModal();
        } else {
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
      onPanResponderTerminate: () => {
        setIsDragging(false);
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
      },
    })
  ).current;

  return (
    <Modal
      visible={authVisible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
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

      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY }] },
        ]}
      >
        <View
          style={styles.handleContainer}
          {...modalPanResponder.panHandlers}
        >
          <View style={styles.handleBar} />
        </View>

        <View style={styles.modalView}>

          <View style={styles.resultsContainer}>}
          </View>
        </View>

        <View
          style={styles.dragBackground}
          {...modalPanResponder.panHandlers}
        />
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
    left: width * 0.05,
    right: 0,
    top: height * 0.2,
    width: width * 0.9,
    height: height * 0.3, // 0.6 → 0.65로 증가
    backgroundColor: 'blue',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  handleContainer: {
    width: width,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -height * 0.02,
    marginBottom: -height * 0.02,
    zIndex: 10,
  },
  handleBar: {
    width: width * 0.2,
    height: height * 0.007,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
  },
  modalView: {
    width: width * 0.85,
    height: height * 0.2, // 0.42 → 0.55로 증가
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.01,
    zIndex: 5,
  },
  resultsContainer: {
    flex: 1, // flex: 1 유지
    width: '100%',
    alignItems: 'center',
    // height 속성 제거 (flex: 1과 충돌)
    borderWidth: 0, // 경계선 제거 (디버깅용이었다면)
  },
  dragBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  flatList: {
    width: width * 0.5,
  },
});

export default React.memo(AuthModal);