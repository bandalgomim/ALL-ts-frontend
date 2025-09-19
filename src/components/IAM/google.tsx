import React, { useContext, useEffect, useState } from 'react';
import { Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { hookAuth } from '../../hooks/IAM.hook';
import { LeagueContext } from '../../context/league.context';
import { TeamContext } from '../../context/team.context';
import { MainContext } from '../../context/main.context';
import { AuthContext } from '../../context/auth.context';
import { MatchContext } from '../../context/match.context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainPageParamList } from '../../model/navigation.dto';


interface GoogleLoginButtonProps {
  type: 'login' | 'signUp';
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ type }) => {
  const {setLogin} = useContext(AuthContext);
  const {setMainRes} = useContext(MainContext);
  const {setTeamRes} = useContext(TeamContext);
  const {setLeagueRes} = useContext(LeagueContext);
  const {setMatchRes} = useContext(MatchContext);
  const [res, setRes] = useState<boolean>(false);
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.replace('MainScreen', undefined);
  };
  useEffect(() => {
    if (res) {
      navigateMain();
    }
  }, [res]);

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
      // 토큰 가져오기
      const { idToken, accessToken } = await GoogleSignin.getTokens();
// idToken을 서버로 전달
      // 백엔드로 전달
      setRes(await hookAuth({idToken: idToken}, type, 'google', setMainRes, setTeamRes, setLeagueRes, setMatchRes))
      
    } catch (err) {
      console.error('Google login error:', err);
      Alert.alert('로그인 실패', String(err));
    }
  };

  return <Button title="Google" onPress={handleLogin} />;
}

export default React.memo(GoogleLoginButton);
