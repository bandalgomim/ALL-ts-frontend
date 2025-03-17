import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { ApiContext } from '../context/context';
import { TeamPageParamList } from '../model/navigation.dto';
import { team } from '../model/league.dto';
import { TeamLogo } from './teamLogo';

export const LeageTeamListBar = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation<NavigationProp<TeamPageParamList>>();
  const {league} = useContext(ApiContext);
  const navigateTeam = (teamId: number) => {
    navigation.navigate("TeamScreen", { teamId: teamId });
  };

  return (
    <View style={[styles.CalendarContainer, {width: width, height: width*0.320, marginTop: height*0.005, marginBottom: -height*0.036}]}>
      <ImageBackground
        resizeMode="contain" 
        style={[styles.ImageBackground, {width:width, height: width*0.32, }]} 
        source={ require('./../assets/league/teamList.png')}
      >
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          style={[styles.scrollView, {width: width*0.8}]}
        >
          {league?.data?.teamList?.map((team: team, index: number) => (
            <View key={index} style={[styles.box, {width: width*0.13, height: width*0.1, marginTop: height*0.057, marginRight: index !== 4 ? width*0.093 : 0}]}>
              <TouchableOpacity 
                style={{alignItems: "center"}}
                onPress={()=>{navigateTeam(team.teamId)}}
              >
                <Shadow startColor='#242b5c'
                  endColor='#30397A'
                  distance={6}
                  offset={[0, 3]}
                  style={[{ width:width*0.13-6, height: width*0.13-6}, styles.ShadowContainer]}
                >
                    <TeamLogo
                      logo={null}
                      type={"middle"}
                      color={'blue'}
                    />
                </Shadow>
                <Text style={[styles.teamName, {fontSize:width*0.05, marginTop: height*0.005}]}>{team.teamInit}</Text>
              </TouchableOpacity>
            </View>
          )) } 
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

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
    transform: [{ rotate: '2deg' }]
    //borderWidth: 1
  },
  ShadowContainer: {
    borderRadius: "5",
    alignItems: 'center',
    justifyContent: 'center' 
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
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