import React from 'react';
import { View, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import { Shadow  } from 'react-native-shadow-2';

interface TeamLogoPros {
    logo: string | null;
    type: string;
    color: string;
}

export const TeamLogo: React.FC<TeamLogoPros> = ({logo, color, type }) => {
  const { width, height } = Dimensions.get('window');
  let size;
  let req;

  if (type === 'small') {
    size = width * 0.1;
    req = require('../assets/teamLogo/teamLogo_s.png');
  } else if(type === 'big') {
    size = width * 0.295;
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
        <Image
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
