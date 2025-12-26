/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import { width, height } from '@/global';
import { hookDeleteAccount } from '@hooks/IAM.hook';
import { useLeagueActions } from '@context/league.context';
import { useMainActions } from '@context/main.context';
import { useMatchActions } from '@context/match.context';
import { useTeamActions } from '@context/team.context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '@model/navigation.dto';

const DeleteButton = () => {
  const { setMainRes } = useMainActions();
  const {setTeamRes} = useTeamActions();
  const { setLeagueRes } = useLeagueActions();
  const { setMatchRes } = useMatchActions();
  const [res, setRes] = useState<boolean | string>('초기값');
  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();
  const navigateIAM = useCallback(() => {
    navigationIAM.replace('IAMScreen', {state: true});
  }, [navigationIAM]); // navigationTeam을 의존성 배열에 추가
  const uri = require('@assets/match/platform/spotv.png');

  useEffect(() => {
    if (res === true) {
      Alert.alert('계정 삭제 완료', '이용해주셔서 감사합니다.', [
        { text: '확인', onPress: () => {
          navigateIAM();
        } },
      ]);
    } else if (res === false) {
      Alert.alert('계정 삭제 실패', '다시 시도해주세요.');
    }
  }, [res]);

  const onPress = async () => {
    Alert.alert(
      '주의',
      'ID 삭제 시 데이터베이스에 저장된 모든 유저 데이터가 삭제됩니다. 정말 삭제하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'cancel',        // iOS: 회색, Android: 기본 취소
          onPress: () => {
            // 취소 시 로직 (필요하면)
          },
        },
        {
          text: '예',
          style: 'destructive',   // iOS: 빨간 버튼
          onPress: async () => {
            setRes(await hookDeleteAccount( setMainRes, setTeamRes, setLeagueRes, setMatchRes));
          },
        },
      ],
      { cancelable: true }        // Android에서 바깥 터치로 닫기 허용 (원치 않으면 false)
    );
  };


  return (
    <TouchableOpacity style={styles.authContainer} onPress={onPress}>
      <ImageBackground
        resizeMode="contain"
        source={uri}
        style={[styles.box]}
      >
        <Text style={[styles.boxText]}>
            계정 제거
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    alignItems: 'center',
  },
  box: {
    width: width * 0.2,
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    marginTop: -height * 0.008,
    fontFamily: 'sb-it-ver1',
    color: 'white',
    fontSize: width * 0.06,
    width: width * 0.21,
    textAlign: 'center',
  },

});

export default React.memo(DeleteButton);
