import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { width, height } from '@/global';

interface TeamHeaderProps {
  year: number;
  month: number;
}

const MainHeader: React.FC<TeamHeaderProps> = ({ year, month }) => {

  return (
    <View style={[styles.headerContainer]}>
      <Text style={[ styles.dateText]}>
        {`${year}/${month + 1 > 9 ? month + 1 : '0' + (month + 1)}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: -height * 0.023,
    height: height * 0.05,
    flexDirection: 'row',
    marginLeft: width * -0.55,
  },
  dateText: {
    height: height * 0.05,
    width: width * 0.22,
    fontSize: width * 0.09,
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
    color: '#FFFFFF',
    textShadowColor: '#252c5e',
    textShadowOffset: { width: 0.5, height: 3 },
    textShadowRadius: 3,
  },
});

export default React.memo(MainHeader);
