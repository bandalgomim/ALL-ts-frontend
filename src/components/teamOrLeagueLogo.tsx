import React from 'react';
import { StyleSheet,  Image, ImageBackground } from 'react-native';
import { width } from '../global';
import FastImage from 'react-native-fast-image';


interface TeamOrLogoPros {
    logo: string | null;
    type: string;
}

const TeamOrLeagueLogo: React.FC<TeamOrLogoPros> = ({ logo, type }) => {
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

  return (
      <ImageBackground
        source={req}
        style={[styles.logoView, { width:size }]}
      >
        <FastImage
          resizeMode="contain"
          source={{ uri: logo as string}}
          style={{ width: size * 0.8, height: size * 0.8 }}
        />
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logoView: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(TeamOrLeagueLogo);
