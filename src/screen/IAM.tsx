
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text,  TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { hookLogIn } from '../hooks/IAM.hook';
import { width, height } from '../global';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainPageParamList } from '../model/navigation.dto';
import { AuthContext } from '../context/auth.context';
import { LeagueContext } from '../context/league.context';
import { MainContext } from '../context/main.context';
import { MatchContext } from '../context/match.context';
import { TeamContext } from '../context/team.context';

const IAMScreen = () => {
  const {login, setLogin} = useContext(AuthContext);
  const {setMainRes} = useContext(MainContext);
  const {setTeamRes} = useContext(TeamContext);
  const {setLeagueRes} = useContext(LeagueContext);
  const {setMatchRes} = useContext(MatchContext);
  const [loginInfo, setLoginInfo] = useState<string | null>(null);
  const [id, setId] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.replace('MainScreen', undefined);
  };

  const handlePress = () => {
    hookLogIn({id: id}, setMainRes, setTeamRes, setLeagueRes, setMatchRes, setLogin);
  }

  useEffect(() => {
    if (login === true) {
      navigateMain();
    }
  }, [login]);

  const handleSearch = useCallback((input: string) => {
    setId(input);
  }, [setId]);

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
      <View style={[{flexDirection: 'row', alignItems:'center'}]}>
        <TextInput
          placeholder={isFocused ? '' : 'login'} // 포커스되면 placeholder 제거
          placeholderTextColor={'#30397A'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={id}
          onChangeText={handleSearch}
          style={[styles.textInput, { fontSize: width * 0.07, width:width * 0.5, height:height * 0.06 }]}
        />
        <TouchableOpacity onPress={handlePress} // 버튼 클릭 시 실행되는 함수
        >
          <Icon
            name="login"  // 아이콘 이름 (Ionicons의 close 아이콘)
            size={width * 0.1}
            color="gray"
          />
        </TouchableOpacity>
      </View>
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

export default IAMScreen;
