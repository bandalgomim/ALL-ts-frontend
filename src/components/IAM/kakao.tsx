import React from 'react';
import {Button, Alert} from 'react-native';
import {login, getProfile} from '@react-native-seoul/kakao-login';
import axios from 'axios';

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    try {
      // 1. 카카오 로그인 → 토큰 발급
      const tokenResult = await login();
      // tokenResult: { accessToken, refreshToken, idToken?, ... }

      console.log('카카오 토큰:', tokenResult);

      // 2. 필요하다면 프로필 정보도 조회 가능
      const profile = await getProfile();
      console.log('카카오 프로필:', profile);

      // 3. 토큰을 백엔드로 전달
      const response = await axios.post('https://your-backend.com/api/auth/kakao', {
        accessToken: tokenResult.accessToken,
        idToken: tokenResult.idToken, // 발급된 경우만
      });

      Alert.alert('로그인 성공', JSON.stringify(response.data));
    } catch (err) {
      console.error('카카오 로그인 실패:', err);
      Alert.alert('로그인 실패', String(err));
    }
  };

  return <Button title="카카오 로그인" onPress={handleKakaoLogin} />;
};

export default KakaoLoginButton;