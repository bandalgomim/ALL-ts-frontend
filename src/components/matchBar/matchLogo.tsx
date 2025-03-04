import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Shadow  } from 'react-native-shadow-2';

interface MatchLogoPros {
    logo: string | null;
    shadowStart: string | null;
    shadowEnd: string | null;
}

export const MatchLogo: React.FC<MatchLogoPros> = ({logo, shadowStart, shadowEnd}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={[styles.LogoContainer, {width: width*0.08225+6, height: width*0.08225}]}>
      <Shadow startColor={shadowStart as string}
        endColor={shadowEnd as string}
        distance={6}
        offset={[0, 6]}
        style={[{width: (width*0.08225)-6}, styles.ShadowContainer]}
      >
        <View
          style={{ width:width*0.08225, aspectRatio: 1, backgroundColor:'#ffffff', borderRadius: 10, marginLeft: -3}}
        ><Text>test</Text></View>
      </Shadow>
    </View>
  )
}

const styles = StyleSheet.create({
  LogoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ShadowContainer: {
    borderRadius: 10,
    aspectRatio: 1,
    //marginLeft: 6
  },
});
