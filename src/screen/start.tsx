// SplashScreen.tsx
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hookRefreshToken, hookIsLogin } from '../hooks/IAM.hook';
import { AuthContext } from '../context/auth.context';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList, MainPageParamList } from '../model/navigation.dto';

export default function StartScreen() {
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.replace('MainScreen', undefined);
  };
  useEffect(() => {
    // 비동기 인증 체크 후 바로 이동
        hookIsLogin(navigateMain)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View />
  );
}
