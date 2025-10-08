import appleAuth from '@invertase/react-native-apple-authentication';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Alert } from "react-native";
import { MainPageParamList } from "../../model/navigation.dto";
import { hookAuth } from "../../hooks/IAM.hook";
import { useLeagueState, useLeagueActions } from "../../context/league.context";
import { useMainActions } from "../../context/main.context";
import { useMatchActions } from "../../context/match.context";
import { useTeamState, useTeamActions } from "../../context/team.context";
import { height, width } from '../../global';

interface AppleAuthButtonProps {
  type: "in" | "up";       // "in" → Sign in / "up" → Sign up
}

const AppleAuthButton: React.FC<AppleAuthButtonProps> = ({ type }) => {
  // type 에 따라 버튼 텍스트 결정
  const buttonText = type === "up" ? "Sign up with Apple" : "Sign in with Apple";
  const { setMainRes } = useMainActions()
  const {setTeamRes} = useTeamActions();
  const { setLeagueRes } = useLeagueActions();
  const { setMatchRes } = useMatchActions();
  const [res, setRes] = useState<boolean | string>("초기값");
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.replace('MainScreen', undefined);
  };
  useEffect(() => {
    if (res === true) {
      navigateMain();
    } else if (res === false) {
      if (type === 'in') {
        Alert.alert(
          '계정이 존재하지 않습니다.',
          '회원가입 하시겠습니까?',
          [
            {
              text: '아니오',
              style: 'cancel',
              onPress: () => {},
            },
            {
              text: '예',
              style: 'destructive',
              onPress: () => {handleLogin('up');}
            },
          ],
          { cancelable: true } 
        );
      }
      else {Alert.alert(
        '계정이 이미 존재합니다',
        '로그인 하시겠습니까?',
        [
          {
            text: '아니오',
            style: 'cancel',
            onPress: () => {
              // 취소 시 로직 (필요하면)
            },
          },
          {
            text: '예',
            style: 'destructive',
            onPress: () => {handleLogin('in');}
          },
        ],
        { cancelable: true } 
      
      );}
    }
  }, [res]);
  


  const handleLogin = async (type: string) => {
    const idToken = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    setRes(await hookAuth({idToken: idToken}, type === 'in' ? 'login' : 'signUp', 'apple', setMainRes, setTeamRes, setLeagueRes, setMatchRes))
  };
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={()=>handleLogin(type)}>
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