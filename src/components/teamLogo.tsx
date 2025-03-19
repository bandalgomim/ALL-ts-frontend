import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { Shadow  } from 'react-native-shadow-2';

interface TeamLogoPros {
    logo: string | null;
    type: string;
    color: string;
}

export const TeamLogo: React.FC<TeamLogoPros> = ({logo, color, type }) => {
  const { width, height } = Dimensions.get('window');
  let size;

  if (type === "small") { 
    size = width*0.08 
  } else if(type === "big") {
    size = width*0.245;
  } else {
    size = width*0.13;
  }


  const [start, end] = color === "blue" ? ["#242b5c", "#30397A"] : ["#c0c0c0", "#ffffff"];

  return (
    <View style={[styles.LogoContainer, {width: size+6, height: size}, ]}>
      <Shadow
        startColor={start as string}
        endColor={end as string}
        distance={6}
        offset={[0, 6]}
        style={[{width: (size)-6}, styles.ShadowContainer, {borderRadius: type === 'small' ? 6 : 10}]}
      >
        <View
          style={[styles.logoView, { width:size }, {borderRadius: type === 'small' ? 5 : 10}]}
        >
          <Image
            resizeMode='contain'
            source={{ uri: logo as string}}
            style={{ width: size*0.9, height: size*0.9 }}
          />
        </View>
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
    alignItems: 'center',
  },
  logoView: {
    aspectRatio: 1,
    backgroundColor:'#f7e9ef',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});