import React, { useEffect } from 'react';
import { Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

interface GoogleLoginButtonProps {
  type: 'login' | 'signUp';
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ type }) => {
  let url: string = '';
  if (type !== 'login' && type !== 'signUp') {
    url = 'http://localhost:4000/auth/login';
  } else if (type === 'login') {
    url = 'http://localhost:4000/auth/signUp';
  }
  useEffect(() => {
    GoogleSignin.configure({
      // ✅ 반드시 Web Client ID (서버 검증용)
      webClientId:
        '596242806015-8hn1iublav6tt7imq47nrci7ejgv1129.apps.googleusercontent.com',

      // ✅ iOS Client ID (plist에 있는 client_id, 선택이지만 넣어주면 안전)
      iosClientId:
        '596242806015-l6dcqkfo99c3j6tk8smlqs94pn37138o.apps.googleusercontent.com',

      offlineAccess: true,            // refresh token 필요 시
      forceCodeForRefreshToken: true, // serverAuthCode 발급 필요 시
    });
  }, []);

  const handleLogin = async () => {
    try {
      // 로그인 실행
      const userInfo = await GoogleSignin.signIn();
      console.log('Google user info:', userInfo);

      // 토큰 가져오기
      const { idToken, accessToken } = await GoogleSignin.getTokens();
// idToken을 서버로 전달
    console.log('ID Token:', idToken, 'Access Token:', accessToken);

      // 백엔드로 전달
      /*const res = await axios.post(url, {
        type: 'google',
        idToken: idToken,
      });

      Alert.alert('서버 응답', JSON.stringify(res.data));*/
    } catch (err) {
      console.error('Google login error:', err);
      Alert.alert('로그인 실패', String(err));
    }
  };

  return <Button title="Google 로그인" onPress={handleLogin} />;
}

export default React.memo(GoogleLoginButton);
