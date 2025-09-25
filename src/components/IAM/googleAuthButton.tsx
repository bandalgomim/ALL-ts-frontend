import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Alert } from "react-native";
import { MainPageParamList } from "../../model/navigation.dto";
import { hookAuth } from "../../hooks/IAM.hook";
import { LeagueContext } from "../../context/league.context";
import { MainContext } from "../../context/main.context";
import { MatchContext } from "../../context/match.context";
import { TeamContext } from "../../context/team.context";
import { height, width } from "../../global";

interface GoogleAuthButtonProps {
  type: "in" | "up";       // "in" → Sign in / "up" → Sign up
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ type }) => {
  // type 에 따라 버튼 텍스트 결정
  const buttonText = type === "up" ? "Sign up with Google" : "Sign in with Google";
  const {setMainRes} = useContext(MainContext);
  const {setTeamRes} = useContext(TeamContext);
  const {setLeagueRes} = useContext(LeagueContext);
  const {setMatchRes} = useContext(MatchContext);
  const [res, setRes] = useState<boolean | string>("초기");
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.replace('MainScreen', undefined);
  };
  useEffect(() => {
    if (res === true) {
      navigateMain();
    } else if (res === false) {
      if (type === 'in') {Alert.alert('로그인 실패', '다시 시도해주세요.');}
      else {Alert.alert('회원가입 실패', '다시 시도해주세요.');}
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
      setRes(await hookAuth({idToken: idToken}, type === 'in' ? 'login' : 'signUp', 'google', setMainRes, setTeamRes, setLeagueRes, setMatchRes))
      
    } catch (err) {
    }
  };
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleLogin}>
      <View style={styles.contentWrapper}>
        {/* PNG 로고 */}
        <Image
          source={require("../../assets/auth/Google.webp")}
          style={styles.icon}
          resizeMode="contain"
        />

        {/* 텍스트 */}
        <Text style={styles.text}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#747775',
    borderWidth: 1,
    borderRadius: 4,
    height: height * 0.045,
    paddingHorizontal: 12,
    width: width * 0.7,
    justifyContent: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: 12,
  },
  text: {
    fontSize: width * 0.045,
    width: width * 0.44,
    fontWeight: '700',
    color: '#1f1f1f',
    letterSpacing: 0.25,
  },
});

export default GoogleAuthButton;
