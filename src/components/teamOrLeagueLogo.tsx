import React, { useMemo } from 'react';
import { StyleSheet, ImageBackground, Text, View, Image } from 'react-native';
import { width } from '@/global';
import FastImage from 'react-native-fast-image';


interface TeamOrLogoPros {
    logo: string | null;
    type: string;
    initial: string;
}

const TeamOrLeagueLogo: React.FC<TeamOrLogoPros> = ({ logo, type, initial }) => {
  const { size, req } = useMemo(() => {
    let sizeValue;
    let reqValue;

    if (type === 'small') {
      sizeValue = width * 0.1;
      reqValue = require('@assets/teamLogo/teamLogo_s.png');
    } else if (type === 'big') {
      sizeValue = width * 0.25;
      reqValue = require('@assets/teamLogo/teamLogo_b.png');
    } else {
      sizeValue = width * 0.16;
      reqValue = require('@assets/teamLogo/teamLogo_m.png');
    }

    return { size: sizeValue, req: reqValue };
  }, [type]);

  const logoImageStyle = useMemo(() => ({
    width: size * 0.8,
    height: size * 0.8,
  }), [size]);

  const logoViewStyle = useMemo(() => [
    styles.logoView,
    { width: size },
  ], [size]);

  return (
      <ImageBackground
        source={req}
        style={logoViewStyle}
      >
        <Image
          resizeMode="contain"
          source={{ uri: logo as string }}
          style={logoImageStyle}
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
