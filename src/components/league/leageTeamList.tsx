import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { View, StyleSheet,  ImageBackground, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import { TeamPageParamList } from '../../model/navigation.dto';
import { teamDto } from '../../model/league.dto';
import TeamOrLeagueLogo  from '../teamOrLeagueLogo';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '../../global';
import { LeagueContext } from '../../context/league.context';

const LeageTeamListBar = () => {
  const navigation = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const {leagueRes} = useContext(LeagueContext);
  const navigateTeam = (teamId: number) => {
    navigation.navigate('TeamScreen', { teamId: teamId });
  };
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
          <Text style={[styles.teamName, {fontSize:width * 0.05, marginTop: -height * 0.002}]}>{item.teamInit}</Text>
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
        <FlatList
          style={[styles.scrollView, {width: width * 0.8}]}
          data={leagueRes.data.teamList}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} // 수직 스크롤바 숨기기 (필요한 경우)
          showsHorizontalScrollIndicator={false}
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
  },
});

export default React.memo(LeageTeamListBar);