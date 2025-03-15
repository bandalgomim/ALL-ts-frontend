import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface TeamHeaderProps {
  year: number;
  month: number;
  type: string;
  goToPrevious: () => void;
  goToNext: () => void;
}

const Header: React.FC<TeamHeaderProps> = ({ year, month, type, goToPrevious, goToNext }) => {
  const { width, height } = Dimensions.get('window');
  let typeStyle: StyleProp<ViewStyle | TextStyle> = [];

  if (type === "team") {
    typeStyle = [styles.TeamHeader, styles.TeamArrow, styles.TeamDate, {left: width*0.2}]
  } else {
    typeStyle = [styles.LeagueHeader, styles.LeagueArrow, styles.LeagueDate, {right: width*0.2}]
  }

  return (
    <View style={[typeStyle[0], {height:height*0.05, marginTop: height*0.023}, typeStyle[3]]}>
      <TouchableOpacity onPress={goToPrevious}>
        <Text style={[typeStyle[1], {height: height*0.05, width: width*0.1, fontSize: width*0.067}]}>{'〈'}</Text>
      </TouchableOpacity>
      <Text style={[typeStyle[2], {height: height*0.05, width: width*0.22, fontSize: width*0.09}]}>{`${year}/${month+1 > 9 ? month+1 : '0' + (month+1) }`}</Text>
      <TouchableOpacity onPress={goToNext}>
        <Text style={[typeStyle[1], {height: height*0.05, width: width*0.1, fontSize: width*0.067}]}>{'〉'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TeamHeader: {
    flexDirection: 'row',
    justifyContent: 'center', // 가로 방향 중앙 정렬
    alignItems: 'flex-end', // 세로 방향 중앙 정렬\
    transform: [{ rotate: '-7deg' }],
  },
  TeamArrow: {
    textAlign: 'center',
    fontFamily: 'built titling sb',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경

  },
  TeamDate: {
    textAlign: 'center',
    fontFamily: 'built titling rg it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
  LeagueHeader: {
    flexDirection: 'row',
    justifyContent: 'center', // 가로 방향 중앙 정렬
    alignItems: 'flex-end', // 세로 방향 중앙 정렬\
    transform: [{ rotate: '7deg' }],
  },
  LeagueArrow: {
    textAlign: 'center',
    fontFamily: 'built titling sb',
    color: '#FFFFFF',
    textShadowColor: '#252c5e', // 그림자 색상
    textShadowOffset: { width: 0.5, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경

  },
  LeagueDate: {
    textAlign: 'center',
    fontFamily: 'built titling rg it',
    color: '#FFFFFF',
    textShadowColor: '#252c5e', // 그림자 색상
    textShadowOffset: { width: 0.5, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
});

export default Header;