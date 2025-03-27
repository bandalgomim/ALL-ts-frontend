import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ApiContext } from '../../context/context';
import { TeamPageParamList } from '../../model/navigation.dto';
import { teamDto } from '../../model/league.dto';
import { TeamOrLeagueLogo } from '../teamOrLeagueLogo';

export const LeageTeamListBar = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation<NavigationProp<TeamPageParamList>>();
  const {leagueReq} = useContext(ApiContext);
  const navigateTeam = (teamId: number) => {
    navigation.navigate('TeamScreen', { teamId: teamId });
  };

  return (
    <View style={[styles.CalendarContainer, {width: width, height: width * 0.320, marginTop: height * 0.005, marginBottom: -height * 0.036}]}>
      <ImageBackground
        resizeMode="contain"
        style={[styles.ImageBackground, {width:width, height: width * 0.32 }]}
        source={ require('./../../assets/league/teamList.png')}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[styles.scrollView, {width: width * 0.8}]}
        >
          {leagueReq?.data?.teamList?.map((team: teamDto, index: number) => (
            <View key={index} style={[styles.box, {width: width * 0.13, height: width * 0.1, marginTop: height * 0.049, marginRight: index !== leagueReq.data.teamList.length - 1 ? width * 0.074 : width * 0.012, marginLeft: width * 0.012}]}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={()=>{navigateTeam(team.teamId);}}
              >
                <TeamOrLeagueLogo
                  logo={team.teamLogo}
                  type={'middle'}
                />
                <Text style={[styles.teamName, {fontSize:width * 0.05, marginTop: -height * 0.002}]}>{team.teamInit}</Text>
              </TouchableOpacity>
            </View>
          )) }
        </ScrollView>
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
    //backgroundColor: "red"
  },
  scrollView:{
    transform: [{ rotate: '2deg' }],
    // 
  },
  ShadowContainer: {
    borderRadius: '5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    // 
  },
  teamName: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
});
