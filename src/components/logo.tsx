import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { width, height } from '../global'
interface logoProps {
  color: 'blue' | 'white';
}

const Logo: React.FC<logoProps>  = ({ color }) => {
  const style = color === 'blue' ? styles.textBlue : styles.textWhite;
    return (
      <View style={[styles.logo, {width: width * 0.8, height: height * 0.24}]}>
        <Text style={[styles.text1, {width: width * 0.5, fontSize: width * 0.43}, style]}>ALL</Text>
        <Text style={[styles.text2, {width:width * 0.15, fontSize: width * 0.43, marginLeft: -width * 0.1}]}>’</Text>
        <Text style={[styles.text3, {width:width * 0.15, fontSize: width * 0.15, marginLeft: -width * 0.08, marginBottom: height * 0.03}, style]}>ts</Text>
      </View>
    );
};
const styles = StyleSheet.create({
  logo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  // 가로 방향 중�� 정��
    alignItems: 'flex-end',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  text2: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  text3: {
    textAlign: 'center',
    fontFamily: 'lt-it-ver3',
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

export default React.memo(Logo);
