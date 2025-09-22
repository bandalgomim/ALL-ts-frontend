import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import { width, height } from '../../global';
import modal from '../calendar/contents/modal';
import { ModalContext } from '../../context/modal.context';

interface ContentsProps {
  type: "login" | "sign Up";
}

const AuthButton: React.FC<ContentsProps> = ({ type }) => {
  const {setAuthVisible} = React.useContext(ModalContext);
  let uri;
    if(type === 'login') {
        uri =  require('../../assets/match/platform/spotv.png');
    } else if(type === 'sign Up') {
        uri =  require('../../assets/match/platform/coupang.png');
    }
  const onPress = () => {
    setAuthVisible(true);
  };

  return (
    <TouchableOpacity style={styles.authContainer} onPress={onPress}>
      <ImageBackground
        resizeMode="contain"
        source={uri}
        style={[styles.box]}
      >
        <Text style={[styles.boxText]}>
            {type}
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