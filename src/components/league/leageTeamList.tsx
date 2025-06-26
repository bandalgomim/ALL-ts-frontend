import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { View, StyleSheet,  ImageBackground, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import { TeamPageParamList } from '../../model/navigation.dto';
import { teamDto } from '../../model/league.dto';
import TeamOrLeagueLogo  from '../teamOrLeagueLogo';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '../../global';
import { LeagueContext } from '../../context/league.context';
import DraggableFlatList from 'react-native-draggable-flatlist';
const LeageTeamListBar = () => {
  const navigation = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const {leagueRes} = useContext(LeagueContext);
  const navigateTeam = (teamId: number) => {
    navigation.navigate('TeamScreen', { teamId: teamId });
  };

  function detectLang(text: string) {
    if (!text) {return;}
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
    const hasEnglish = /[a-zA-Z]/.test(text);

      if (hasKorean && !hasEnglish) {
        return (<Text style={[styles.teamNameKorean]}>{text}</Text>);
      }
      else if (!hasKorean && hasEnglish) {
        return (<Text style={[styles.teamName]}>{text}</Text>);
      } else {return;}
  }

  const renderItem = useCallback(( {item, index}: { item: teamDto, index: number } ) => {
    return (
      <View key={index} style={[styles.box, {width: width * 0.13, height: width * 0.1, marginTop: height * 0.049, marginRight: index !== leagueRes.data.teamList.length - 1 ? width * 0.074 : width * 0.012, marginLeft: width * 0.012}]}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={()=>{navigateTeam(item.teamId);}}
        >
          <TeamOrLeagueLogo
            logo={item.teamLogo}
            type={'middle'}
          />
          {detectLang(item.teamInit)}
        </TouchableOpacity>
      </View>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueRes.data.teamList]);
  return (
    <View style={[styles.CalendarContainer, {width: width, height: width * 0.320, marginTop: height * 0.01, marginBottom: -height * 0.036}]}>
      <ImageBackground
        resizeMode="contain"
        style={[styles.ImageBackground, {width:width, height: width * 0.32 }]}
        source={ require('./../../assets/league/teamList.png')}
      >
        <DraggableFlatList
          style={[styles.scrollView, {width: width * 0.8}]}
          data={leagueRes.data.teamList}
          horizontal={true}
          keyExtractor={(item: teamDto, index: number) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} // 수직 스크롤바 숨기기 (필요한 경우)
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true} // ← 추가: 가로/세로 한 방향만 스크롤 허용
          onStartShouldSetResponderCapture={() => true}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  CalendarContainer: {
    alignItems: 'center',
  },
  ImageBackground: {
    position: 'absolute',
    alignItems: 'center',
  },
  scrollView:{
    transform: [{ rotate: '2deg' }],
  },
  ShadowContainer: {
    borderRadius: '5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamName: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
    fontSize:width * 0.05,
    marginTop: -height * 0.002,
  },
  teamNameKorean: {
    textAlign: 'center',
    fontFamily: 'NotoSansKR-Bold',
    transform: [{ scaleY: 1 }],
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
    fontSize:width * 0.038,
    marginTop: -height * 0.016,
    marginBottom: -height * 0.005,
  },
});

export default React.memo(LeageTeamListBar);