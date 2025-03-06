import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface logoProps {
  type: "blue" | "white";
}

export const Logo: React.FC<logoProps>  = ({ type }) => {
  const { width, height } = Dimensions.get('window');
    return (
      <View style={[styles.logo, {width: width*0.8, height: height*0.24}]}>
        <Text style={[styles.text1, {width: width*0.5, fontSize: width*0.43, color: type === "blue" ? "#30397A" : "white"}]}>ALL</Text>
        <Text style={[styles.text2, {width:width*0.15, fontSize: width*0.43, marginLeft: -width*0.1, color: "#EA5579"}]}>’</Text>
        <Text style={[styles.text3, {width:width*0.15, fontSize: width*0.15, marginLeft: -width*0.08, marginBottom: height*0.03, color: type === "blue" ? "#30397A" : "white"}]}>ts</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  logo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  // 가로 방향 중�� 정��
    alignItems: 'flex-end',
    //borderWidth: 1
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'built titling rg it',
  },
  text2: {
    textAlign: 'center',
    fontFamily: "built titling rg it",
  },
  text3: {
    textAlign: 'center',
    fontFamily: 'built titling lt it',
  }
});