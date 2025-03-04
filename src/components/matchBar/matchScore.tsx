import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Shadow  } from 'react-native-shadow-2';

interface MatchScorePros {
    score: number | null;
    shadowStart: string | null;
    shadowEnd: string | null;
}

export const MatchScore: React.FC<MatchScorePros> = ({score, shadowStart, shadowEnd}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={[styles.scoreContainer, {width: width*0.058+6, height: width*0.08225}]}>
      <Shadow startColor={shadowStart as string}
        endColor={shadowEnd as string}
        distance={6}
        offset={[0, 6]}
        style={[{width: (width*0.058)-6, height: (width*0.08225)-6}, styles.ShadowContainer]}
      >
        <View
          style={{ width:width*0.058, height: width*0.08225, backgroundColor:'#ffffff', borderRadius: 5, marginLeft: -3}}
        >
        <Text style={[styles.scoreBox, {fontSize:width*0.0745, marginTop: -height*0.0017}]}>{score}</Text></View>
      </Shadow>
    </View>
  )
}

const styles = StyleSheet.create({
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ShadowContainer: {
    borderRadius: 5,
  },
  scoreBox: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 1 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  }
});
