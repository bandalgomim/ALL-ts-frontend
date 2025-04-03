import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { width, height } from '../../../global';

interface MainHeaderProps {
  year: number;
  month: number;
  goToPrevious: () => void;
  goToNext: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ year, month, goToPrevious, goToNext }) => {
  return (
    <View style={[styles.Mainheader, {height:height * 0.11}]}>
      <TouchableOpacity onPress={goToPrevious}>
        <Text style={[styles.arrow, {height: height * 0.06, width: width * 0.1, fontSize: height * 0.036}]}>{'〈'}</Text>
      </TouchableOpacity>
      <Text style={[styles.year, {height: height * 0.08, width: width * 0.225, fontSize: height * 0.064, paddingTop: width * 0.01}]}>{year}</Text>
      <Text style={[styles.month, {height: height * 0.11, width: width * 0.2, fontSize: height * 0.1}]}>{`${month + 1 > 9 ? month + 1 : '0' + (month + 1) }`}</Text>
      <TouchableOpacity onPress={goToNext}>
        <Text style={[styles.arrow, {height: height * 0.06, width: width * 0.1, fontSize: height * 0.036}]}>{'〉'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Mainheader: {
    flexDirection: 'row',
    justifyContent: 'center', // 가로 방향 중앙 정렬
    alignItems: 'flex-end', // 세로 방향 중앙 정렬
  },
  arrow: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'built titling sb',
    textShadowColor: '#252c5e', // 그림자 색상
    textShadowOffset: { width: 1, height: 5 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경

  },
  year: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'built titling rg it',
    textShadowColor: '#252c5e', // 그림자 색상
    textShadowOffset: { width: 1, height: 5 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
  month: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'built titling rg it',
    textShadowColor: '#252c5e', // 그림자 색상
    textShadowOffset: { width: 1, height: 5 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
});

export default React.memo(MainHeader);
