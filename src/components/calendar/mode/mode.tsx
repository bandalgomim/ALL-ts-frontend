import React, { Dispatch, SetStateAction } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,  StyleProp, ViewStyle, TextStyle } from 'react-native';
import { width } from '../../../global';
import { localData } from '../../../IAM/localData';

interface ModeProps {
  type: string;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>
}


const Mode: React.FC<ModeProps> = ({ type, mode, setMode }) => {
  let typeColor: StyleProp<ViewStyle | TextStyle> = [];

  if(type === 'league') {
    typeColor = [styles.selectViewWhite, styles.selectedWhite, styles.noSelectedWhite ];
  } else {
    typeColor = [styles.selectViewBlue, styles.selectedBlue, styles.noSelectedBlue ];
  }

  const onModeChange = async (modeChar: string) => {
    setMode(modeChar);
    await localData.set('mode', modeChar);
  };

  return (
    <View style={[typeColor[0], {width: width * 0.75}]}>
      <TouchableOpacity
        onPress={() => onModeChange('m')}
      >
      <Text style={[{fontSize: width * 0.05,  width: width * 0.05}, mode === 'm' ? typeColor[1] : typeColor[2]]}>M</Text></TouchableOpacity>
      <Text style={[typeColor[1], {fontSize: width * 0.05, width: width * 0.04 }]}>/</Text>
      <TouchableOpacity
        onPress={() => onModeChange('w')}
      >
      <Text style={[{fontSize: width * 0.05, width: width * 0.05}, mode === 'w' ? typeColor[1] : typeColor[2]]}>W</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectViewWhite: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  selectedWhite: {
    textAlign: 'center',
    fontFamily: 'rg-bd-ver5',
    color: '#FFFFFF',
    textShadowColor: '#252c5e', // 그림자 색상
    textShadowOffset: { width: 0.5, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  noSelectedWhite: {
    color: '#878cb2',
    textAlign: 'center',
    fontFamily: 'rg-bd-ver5',
  },
  selectViewBlue: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  selectedBlue: {
    textAlign: 'center',
    fontFamily: 'rg-bd-ver5',
    color: '#FFFFFF',
    textShadowColor: '#252c5e', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  noSelectedBlue: {
    textAlign: 'center',
    fontFamily: 'rg-bd-ver5',
    color: '#878cb2',
  },
});

export default React.memo(Mode);
