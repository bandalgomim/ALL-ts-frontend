import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { width, height } from '../../../global';

interface TeamHeaderProps {
  year: number;
  month: number;
  type: string;
  goToPrevious: () => void;
  goToNext: () => void;
}

const Header: React.FC<TeamHeaderProps> = ({ year, month, type, goToPrevious, goToNext }) => {
  let typeStyle: StyleProp<ViewStyle | TextStyle>[] = [];

  if (type === 'team') {
    typeStyle = [styles.TeamHeader, styles.TeamArrow, styles.TeamDate, styles.TeamHeaderPosition];
  } else {
    typeStyle = [styles.LeagueHeader, styles.LeagueArrow, styles.LeagueDate, styles.LeagueHeaderPosition];
  }

  return (
    <View style={[typeStyle[0], styles.headerContainer, typeStyle[3]]}>
      <TouchableOpacity onPress={goToPrevious}>
        <Text style={[typeStyle[1], styles.arrow]}>{'〈'}</Text>
      </TouchableOpacity>
      <Text style={[typeStyle[2], styles.dateText]}>
        {`${year}/${month + 1 > 9 ? month + 1 : '0' + (month + 1)}`}
      </Text>
      <TouchableOpacity onPress={goToNext}>
        <Text style={[typeStyle[1], styles.arrow]}>{'〉'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.05,
    marginTop: height * 0.023,
  },
  arrow: {
    height: height * 0.05,
    width: width * 0.1,
    fontSize: width * 0.067,
  },
  dateText: {
    height: height * 0.05,
    width: width * 0.22,
    fontSize: width * 0.09,
  },
  TeamHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    transform: [{ rotate: '-7deg' }],
  },
  TeamHeaderPosition: {
    left: width * 0.2,
  },
  TeamArrow: {
    textAlign: 'center',
    fontFamily: 'sb-rg-ver4',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  TeamDate: {
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  LeagueHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    transform: [{ rotate: '7deg' }],
  },
  LeagueHeaderPosition: {
    right: width * 0.2,
  },
  LeagueArrow: {
    textAlign: 'center',
    fontFamily: 'sb-rg-ver4',
    color: '#FFFFFF',
    textShadowColor: '#252c5e',
    textShadowOffset: { width: 0.5, height: 3 },
    textShadowRadius: 3,
  },
  LeagueDate: {
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
    color: '#FFFFFF',
    textShadowColor: '#252c5e',
    textShadowOffset: { width: 0.5, height: 3 },
    textShadowRadius: 3,
  },
});

export default React.memo(Header);
