import React, { useMemo } from 'react';
import { StyleSheet, ImageBackground, Text, View, Image } from 'react-native';
import { sw } from '@/global';

interface EmblemMiddleProps {
  logo: string | null;
  initial: string;
}

const SIZE = sw(63); // width * 0.16 기준

const EmblemMiddle: React.FC<EmblemMiddleProps> = ({ logo, initial }) => {
  const logoImageStyle = useMemo(() => ({
    width: SIZE * 0.8,
    height: SIZE * 0.8,
  }), []);

  const fontSizeStyle = useMemo(() => ({
    fontSize: initial.length < 4 ? SIZE * 0.6 : SIZE * 0.5,
  }), [initial.length]);

  return (
    <ImageBackground
      source={require('@assets/teamLogo/teamLogo_m.png')}
      style={styles.container}
    >
      {logo !== null
        ? <Image resizeMode="contain" source={{ uri: logo }} style={logoImageStyle} />
        : <View><Text style={[styles.initial, fontSizeStyle]}>{initial}</Text></View>
      }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: 'sb-it-ver1',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    textAlign: 'center',
    marginTop: sw(2),
  },
});

export default React.memo(EmblemMiddle);
