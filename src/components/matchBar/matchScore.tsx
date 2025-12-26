import React, { useMemo } from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native';
import { width, height } from '@/global';

interface MatchScorePros {
    score: string | number;
    color: string;
    type: string;
}

const MatchScore: React.FC<MatchScorePros> = ({score, color, type}) => {
  const { req, size } = useMemo(() => {
    const sizeValue = type === 'small' ? width * 0.1 : width * 0.34;
    let reqValue;

    switch (true) {
      case (type === 'small' && color === 'blue'):
        reqValue = require('@assets/score/score_w_s.png');
        break;
      case (type === 'big' && color === 'blue'):
        reqValue = require('@assets/score/score_w.png');
        break;
      case (type === 'small' && color === 'white'):
        reqValue = require('@assets/score/score_b_s.png');
        break;
      case (type === 'big' && color === 'white'):
        reqValue = require('@assets/score/score_b.png');
        break;
      default:
        reqValue = require('@assets/score/score_w_s.png');
        break;
    }

    return { req: reqValue, size: sizeValue };
  }, [type, color]);

  const containerStyle = useMemo(() => [
    styles.scoreContainer,
    {
      width: size,
      height: size,
      marginLeft: -width * 0.013,
      marginRight: -width * 0.013,
    },
  ], [size]);

  const textStyle = useMemo(() => [
    styles.scoreBox,
    {
      color: color === 'white' ? '#ffffff' : '#30397A',
      fontSize: type === 'small' ? width * 0.07 : width * 0.22,
      marginTop: type === 'small' ? height * 0.001 : height * 0.001,
      width: size * 1.2,
    },
  ], [color, type, size]);

  return (
    <ImageBackground
      resizeMode="contain"
      source={req}
      style={containerStyle}
    >
      <Text style={textStyle}>
        {score}
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBox: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
  },
});

export default React.memo(MatchScore);
