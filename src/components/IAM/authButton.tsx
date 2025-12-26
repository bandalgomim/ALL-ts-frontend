import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import { width, height } from '@/global';

interface ContentsProps {
  type: "in" | "up",
  snsView: boolean,
  setType: (type: 'in' | 'up') => void,
  setSnsView: (view: boolean) => void,
}

const AuthButton: React.FC<ContentsProps> = ({ type, snsView, setType, setSnsView }) => {
  let uri;
    if(type === 'in') {
        uri = require('@assets/match/platform/spotv.png');
    } else if(type === 'up') {
        uri = require('@assets/match/platform/coupang.png');
    }
    
  const onPress = () => {
// 이미 공유드린 패턴 요약
setType(type);
if (!snsView) {
  setSnsView(true);
} else {
  setSnsView(false);
  // 다음 프레임(2번) 뒤 다시 열어 애니메이션 재생
  setTimeout(() => setSnsView(true), 300);
}

    
  };

  return (
    <TouchableOpacity style={styles.authContainer} onPress={onPress}>
      <ImageBackground
        resizeMode="contain"
        source={uri}
        style={[styles.box]}
      >
        <Text style={[styles.boxText]}>
            {type === "in" ? '로그인' : "회원가입"}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    alignItems: 'center',
  },
  box: {
    width: width * 0.2,
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    marginTop: -height * 0.008,
    fontFamily: 'sb-it-ver1',
    color: 'white',
    fontSize: width * 0.06,
    width: width * 0.21,
    textAlign: 'center',
  },

});

export default React.memo(AuthButton);