/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, StyleSheet,  ImageBackground } from 'react-native';
import { width, height } from '../../global';

interface MatchScorePros {
    score: string | number;
    color: string;
    type: string;
}

const MatchScore: React.FC<MatchScorePros> = ({score, color, type}) => {
  let req;
  const size = type === 'small'
    ? width * 0.1
    : width * 0.34;
  switch (true) {
    case (type === 'small' && color === 'blue'):
      req = require('../../assets/score/score_w_s.png');
      break;
    case (type === 'big' && color === 'blue'):
      req = require('../../assets/score/score_w.png');
      break;
    case (type === 'small' && color === 'white'):
      req = require('../../assets/score/score_b_s.png');
      break;
    default:
      req = require('../../assets/score/score_w_s.png');
      break;
  }

  return (
    <ImageBackground
      resizeMode="contain"
      source={req}
      style={[styles.scoreContainer, { width: size, height:size, marginLeft: -width * 0.013, marginRight: -width * 0.013}]}
    >
      <Text style={[styles.scoreBox, {color: color === 'white' ? '#ffffff' : '#30397A',
        fontSize: type === 'small' ? width * 0.07 : width * 0.22,
        marginTop: type === 'small' ? height * 0.001 : height * 0.001,
        width: size * 1.2}]}
      >
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