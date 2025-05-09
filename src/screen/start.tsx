// SplashScreen.tsx
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hookRefreshToken } from '../hooks/IAM.hook';
import { AuthContext } from '../context/auth.context';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList, MainPageParamList } from '../model/navigation.dto';

export default function StartScreen() {
  const navigation = useNavigation();
  const {login, setLogin} = useContext(AuthContext);
  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  useEffect(() => {
    // 비동기 인증 체크 후 바로 이동
    hookRefreshToken(setLogin).then(() => {
      if (login === false) {
        navigationIAM.replace('IAMScreen');
      } else {
        navigationMain.replace('MainScreen');
      }
    });
  }, []);

  return (
    <View>
    </View>
  );
}