import React from 'react';
import { StyleSheet,  Image, ImageBackground, Text } from 'react-native';
import { height, width } from '../global';
import FastImage from 'react-native-fast-image';


interface TeamOrLogoPros {
    logo: string | null;
    type: string;
    initial: string;
}

const TeamOrLeagueLogo: React.FC<TeamOrLogoPros> = ({ logo, type, initial }) => {
  let size;
  let req;

  if (type === 'small') {
    size = width * 0.1;
    req = require('../assets/teamLogo/teamLogo_s.png');
  } else if(type === 'big') {
    size = width * 0.25;
    req = require('../assets/teamLogo/teamLogo_b.png');
  } else {
    size = width * 0.16;
    req = require('../assets/teamLogo/teamLogo_m.png');
  }
  function detectLang(text: string | null) {
    if (!text) {return;}
    const hasKR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
    const hasEnglish = /[a-zA-Z]/.test(text);
      if (hasKR && !hasEnglish) {
        return (<Text style={[styles.fontBlueBigKR, {fontSize: size*0.5}]}>{text}</Text>);
      }
      else if (!hasKR && hasEnglish) {
        return (<Text style={[styles.fontBlueBig, {fontSize: size*0.6}]}>{text}</Text>);
      } else {return;}
  }
  return (
      <ImageBackground
        source={req}
        style={[styles.logoView, { width:size }]}
      >
        {logo !== null ? <FastImage
          resizeMode="contain"
          source={{ uri: logo as string}}
          style={{ width: size * 0.8, height: size * 0.8 }}
        /> : <Text>{detectLang(initial)}</Text>}
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logoView: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    fontBlueBig: {
      fontFamily: 'sb-it-ver1',
      color: '#30397A',
      textShadowColor: '#bdb4b4',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 3,
      width: width * 0.5,
      textAlign: 'center',
    },
    fontBlueBigKR: {
      fontFamily: 'NotoSansKR-ExtraBold',
      color: '#30397A',
      textShadowColor: '#bdb4b4',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 3,
      width: width * 0.5,
      textAlign: 'center',
      opacity: 0.8,
    },
});

export default React.memo(TeamOrLeagueLogo);
