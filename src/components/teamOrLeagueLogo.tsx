import React from 'react';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';
import { width } from '@/global';
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
    req = require('@assets/teamLogo/teamLogo_s.png');
  } else if(type === 'big') {
    size = width * 0.25;
    req = require('@assets/teamLogo/teamLogo_b.png');
  } else {
    size = width * 0.16;
    req = require('@assets/teamLogo/teamLogo_m.png');
  }

  const logoImageStyle = { width: size * 0.8, height: size * 0.8 };
  const fontSizeStyle = { fontSize: initial.length < 4 ? size * 0.6 : size * 0.5 };

  return (
      <ImageBackground
        source={req}
        style={[styles.logoView, { width: size }]}
      >
        {logo !== null ? <FastImage
          resizeMode="contain"
          source={{ uri: logo as string }}
          style={logoImageStyle}
        /> :
        <View>
          <Text style={[styles.fontBlueBig, fontSizeStyle]}>{initial}</Text>
        </View>}
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
    textAlign: 'center',
    marginTop: width * 0.005,
  },
});

export default React.memo(TeamOrLeagueLogo);
