import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { Shadow  } from 'react-native-shadow-2';

interface SerchBarPros {
    type: string;
}

export const SerchBar: React.FC<SerchBarPros> = ({type}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={[styles.Container, {width: width*0.7, height: height*0.1}]}>
      <TouchableOpacity>
        <Image 
          resizeMode="contain" 
          style={[{width:width*0.45, height: width*0.1}]} 
          source={ type=== 'b' ? require('./../assets/searchBar/serchBar_blue.png') : require('./../assets/searchBar/serchBar_white.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    //borderWidth: 1
  },
});