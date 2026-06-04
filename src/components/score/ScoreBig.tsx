import React, { useMemo } from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native';
import { sw, sh } from '@/global';

interface ScoreBigProps {
  score: string | number;
  color: string;
}

const SIZE = sw(134); // width * 0.34

const ScoreBig: React.FC<ScoreBigProps> = ({ score, color }) => {
  const req = color === 'blue'
    ? require('@assets/score/score_w.png')
    : require('@assets/score/score_b.png');

  const textStyle = useMemo(() => [
    styles.scoreText,
    {
      color: color === 'white' ? '#ffffff' : '#30397A',
      fontSize: sw(86),
      marginTop: sh(1),
      width: SIZE * 1.2,
    },
  ], [color]);

  return (
    <ImageBackground
      resizeMode="contain"
      source={req}
      style={styles.container}
    >
      <Text style={textStyle}>{score}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    marginLeft: -sw(5),
    marginRight: -sw(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
  },
});

export default React.memo(ScoreBig);
