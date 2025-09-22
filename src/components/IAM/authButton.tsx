import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import { width, height } from '../../global';

interface ContentsProps {
  type: "in" | "up",
  setType: (type: 'in' | 'up') => void,
  setSnsView: (view: boolean) => void,
}

const AuthButton: React.FC<ContentsProps> = ({ type, setType, setSnsView }) => {
  let uri;
    if(type === 'in') {
        uri =  require('../../assets/match/platform/spotv.png');
    } else if(type === 'up') {
        uri =  require('../../assets/match/platform/coupang.png');
    }
  const onPress = () => {
    setType(type);
    setSnsView(true);
  };

  return (
    <TouchableOpacity style={styles.authContainer} onPress={onPress}>
      <ImageBackground
        resizeMode="contain"
        source={uri}
        style={[styles.box]}
      >
        <Text style={[styles.boxText]}>
            Sign {type}
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