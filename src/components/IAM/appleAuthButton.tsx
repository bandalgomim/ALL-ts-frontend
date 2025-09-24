import appleAuth from '@invertase/react-native-apple-authentication';
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
import { height, width } from '../../global';

interface AppleAuthButtonProps {
  type: "in" | "up";       // "in" → Sign in / "up" → Sign up
}

const AppleAuthButton: React.FC<AppleAuthButtonProps> = ({ type }) => {
  // type 에 따라 버튼 텍스트 결정
  const buttonText = type === "up" ? "Sign up with Apple" : "Sign in with Apple";
  const {setMainRes} = useContext(MainContext);
  const {setTeamRes} = useContext(TeamContext);
  const {setLeagueRes} = useContext(LeagueContext);
  const {setMatchRes} = useContext(MatchContext);
  const [res, setRes] = useState<boolean | string>("초기값");
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
  


  const handleLogin = async () => {
    try {
      const idToken = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
// idToken을 서버로 전달
      // 백엔드로 전달
      setRes(await hookAuth({idToken: idToken}, type === 'in' ? 'login' : 'signUp', 'apple', setMainRes, setTeamRes, setLeagueRes, setMatchRes))
      
    } catch (err) {
      console.error('Google login error:', err);
    }
  };
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleLogin}>
      <View style={styles.contentWrapper}>
        {/* PNG 로고 */}
        <Image
          source={require("../../assets/auth/Apple.png")}
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

export default AppleAuthButton;