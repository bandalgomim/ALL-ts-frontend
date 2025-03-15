import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Shadow  } from 'react-native-shadow-2';

interface MatchScorePros {
    score: number | null;
    color: string;
    type: string;
}

export const MatchScore: React.FC<MatchScorePros> = ({score, color, type}) => {
  const { width, height } = Dimensions.get('window');
  const [start, end] = color === "blue" ? ["#242b5c", "#30397A"] : ["#c0c0c0", "#ffffff"];
  const size = type === 'small' ? [width*0.058, width*0.08225] : [width*0.2, width*0.27]

  return (
    <View style={[styles.scoreContainer, {width: size[0]+6, height: size[1]}]}>
      <Shadow startColor={start as string}
        endColor={end as string}
        distance={6}
        offset={[0, 6]}
        style={[{width: (size[0])-6, height: (size[1])-6}, styles.ShadowContainer]}
      >
        <View
          style={{ width:size[0], height: size[1], borderRadius:5, backgroundColor: color === "white" ? "#30397A" : "#ffffff"}}
        >
        <Text style={[styles.scoreBox, {color: color === "white" ? "#ffffff" : "#30397A", 
          fontSize: type === 'small' ? width*0.0745 : width*0.22, 
          marginTop: type === 'small' ? -height*0.0017 : height*0.001}]}>{score}</Text></View>
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
    alignItems: 'center',
  },
  scoreBox: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
  },
});
