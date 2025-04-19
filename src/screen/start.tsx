import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text,  ActivityIndicator } from 'react-native';
import { useRefreshToken } from '../hooks/IAM.hook';
import { width, height } from '../global';
import { ApiContext } from '../context/context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList, MainPageParamList } from '../model/navigation.dto';

const StartScreen = () => {
  const {login} = useContext(ApiContext);
  useRefreshToken();

  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();
  const navigateMain = () => { navigationMain.navigate('MainScreen', undefined); };
  const navigateIAM = () => { navigationIAM.navigate('IAMScreen', undefined); };

  const [loading, setLoading] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => Math.min(prev + 0.2, 1));
    }, 10); // 0.1초(100ms)마다 실행
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (login === true) {
      navigateMain();
    } else {
        navigateIAM();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <View style={[styles.LoadingContainer]}>
      <View style={[styles.logo, {width: width * 0.8, height: height * 0.24, marginTop:-height * 0.04}]}>
        <Text style={[styles.text1, {width: width * 0.5, fontSize: width * 0.43}, styles.textWhite]}>ALL</Text>
        <Text style={[styles.text2, {width:width * 0.15, fontSize: width * 0.43, marginLeft: -width * 0.1}]}>’</Text>
        <Text style={[styles.text3, {width:width * 0.15, fontSize: width * 0.15, marginLeft: -width * 0.08, marginBottom: height * 0.03}, styles.textWhite]}>ts</Text>
      </View>
      <View>
        <Text style={[styles.text4, {width: width, fontSize: width * 0.0885, marginTop:-height * 0.04}, styles.textWhite]}>All  Sports  Scheduler</Text>
      </View>
      <ActivityIndicator size="large" color={'#30397A'} style={{marginTop: height * 0.03}}/>
        <Text style={[styles.textContainser, {fontSize: width * 0.1}, styles.textWhite]}>{Math.round(loading * 99)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // MainTabBar가 화면에 꽉 차게 확장
    position: 'absolute', // 절대 위치를 사용하여 화면 상단에 배치
    bottom: 0, // 화면 하단에 고정
    left: 0,
    right: 0,
    zIndex: 1,  // MainTabBar가 다른 요소 위에 표시되도록 설정
    backgroundColor: 'transparent', // 배경색을 투명으로 설정하여 위에 요소들이 보이게
  },
  LoadingContainer: {
    backgroundColor: '#30397A',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainser: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',  // 가로 방향 중�� 정��
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
  text4: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
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
    textShadowRadius: 3, // 그림자 반경
  },
  textInput: {
    fontFamily: 'sb-it-ver1',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'gray',
    color: 'white',
  },
});

export default StartScreen;
