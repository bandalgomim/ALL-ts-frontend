import React from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

interface IsSelectedPros {
    isSelectrd: boolean | null;
    
}

export const IsSelected: React.FC<IsSelectedPros> = ({isSelectrd}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <TouchableOpacity>
      <Image resizeMode="contain" style={[styles.container, {width: width*0.07, height: width*0.07}]} source={require('./../assets/star/star.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  }
});