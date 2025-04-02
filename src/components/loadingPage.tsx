
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';

interface logoProps {
  color: 'blue' | 'white';
}

const LoadingScreen : React.FC<logoProps>  = ({ color }) => {
  const { width, height } = Dimensions.get('window');
  const [loading, setLoading] = useState(0);
  const style = color === 'blue' ? styles.textBlue : styles.textWhite;
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => Math.min(prev + 0.2, 1));

    }, 10); // 0.1초(100ms)마다 실행
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.LoadingContainer, {backgroundColor: color === 'blue' ? '#ffffff' : '#30397A'}]}>
      <View style={[styles.logo, {width: width * 0.8, height: height * 0.24, marginTop:-height * 0.04}]}>
        <Text style={[styles.text1, {width: width * 0.5, fontSize: width * 0.43}, style]}>ALL</Text>
        <Text style={[styles.text2, {width:width * 0.15, fontSize: width * 0.43, marginLeft: -width * 0.1}]}>’</Text>
        <Text style={[styles.text3, {width:width * 0.15, fontSize: width * 0.15, marginLeft: -width * 0.08, marginBottom: height * 0.03}, style]}>ts</Text>
      </View>
      <View>
        <Text style={[styles.text4, {width: width, fontSize: width * 0.0885, marginTop:-height * 0.04}, style]}>All  Sports  Scheduler</Text>
      </View>
      <ActivityIndicator size="large" color={color === 'blue' ? '#30397A' : '#ffffff'} style={{marginTop: height*0.03}}/>
        <Text style={[styles.textContainser, {fontSize: width * 0.1}, style]}>{Math.round(loading * 99)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textContainser: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',  // 가로 방향 중�� 정��
    alignItems: 'flex-end',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'built titling rg it',
  },
  text2: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'built titling rg it',
  },
  text3: {
    textAlign: 'center',
    fontFamily: 'built titling lt it',
  },
  text4: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'built titling rg it',
  },
  textWhite: {
    color: '#ffffff',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 5 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경

  },
  textBlue: {
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
});

export default React.memo(LoadingScreen);