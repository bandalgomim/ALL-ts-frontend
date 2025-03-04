import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { Shadow  } from 'react-native-shadow-2';

interface IsSelectedPros {
    isSelectrd: boolean | null;
    
}

export const IsSelected: React.FC<IsSelectedPros> = ({isSelectrd}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <Image resizeMode="contain" style={[styles.container, {width: width*0.07, height: width*0.07}]} source={require('./../../assets/star/star.png')} />
  )
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  }
});