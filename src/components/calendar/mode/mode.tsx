import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { width } from '@/global';
import { localDataMmkv } from '@IAM/localData';

interface ModeProps {
  type: string;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>
}

const Mode: React.FC<ModeProps> = ({ type, mode, setMode }) => {
  console.log(mode);

  const typeColor = useMemo((): StyleProp<ViewStyle | TextStyle>[] => {
    if(type === 'league') {
      return [styles.selectViewWhite, styles.selectedWhite, styles.noSelectedWhite];
    }
    return [styles.selectViewBlue, styles.selectedBlue, styles.noSelectedBlue];
  }, [type]);

  const onModeChangeMonth = useCallback(() => {
    setMode('m');
    localDataMmkv.set('mode', 'm');
  }, [setMode]);

  const onModeChangeWeek = useCallback(() => {
    setMode('w');
    localDataMmkv.set('mode', 'w');
  }, [setMode]);

  const containerStyle = useMemo(() => [
    typeColor[0],
    { width: width * 0.75 },
  ], [typeColor]);

  const modeTextStyle = useMemo(() => ({
    fontSize: width * 0.05,
    width: width * 0.05,
  }), []);

  const separatorStyle = useMemo(() => [
    typeColor[1],
    { fontSize: width * 0.05, width: width * 0.04 },
  ], [typeColor]);

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onModeChangeMonth}>
        <Text style={[modeTextStyle, mode === 'm' ? typeColor[1] : typeColor[2]]}>M</Text>
      </TouchableOpacity>
      <Text style={separatorStyle}>/</Text>
      <TouchableOpacity onPress={onModeChangeWeek}>
        <Text style={[modeTextStyle, mode === 'w' ? typeColor[1] : typeColor[2]]}>W</Text>
      </TouchableOpacity>
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
