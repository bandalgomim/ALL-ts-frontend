import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image, Platform } from 'react-native';
import { Shadow  } from 'react-native-shadow-2';
import { getMatchReqDto } from '../model/match.dto';
import { SerchBar } from './serchBar';
import { TeamLogo } from './teamLogo';
import { MatchScore } from './matchBar/matchScore';
import { IsSelected } from './isSelected';

interface MatchPros {
    match: getMatchReqDto | null
}

export const Match: React.FC<MatchPros> = ({ match }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={[styles.container]}>
      <View style={[styles.middleContainer, {}]}>
        <SerchBar
          type="match"
        />
        <View style={{width: width*0.07, height: width*0.07, marginTop: -height*0.03, marginLeft: width*0.77, borderWidth:0}}>
          <IsSelected
            isSelectrd={false}
          />
        </View>
        <Image
          resizeMode="contain"
          style={{width: width*0.3, marginTop: height*0.25, borderWidth:0}}
          source={require('./../assets/match/score.png')}
        />

      </View>
      <View style={[styles.teamContainer,{}]}>
        <View style={[styles.homeTeamContainer]}>
          <View style={[styles.teamLogoContainer, {marginTop: height*0.1, width: width*0.5, borderWidth:0}]}>
            <TeamLogo
              logo={null}
              type={'big'}
              color={'blue'}
            />
            <View style={[styles.teamInfoContainer, {height: height*0.124}]}>
              <View style={{height: height*0.1, alignItems: 'center'}}>
                <Text style ={[styles.fontWhite, {fontSize: height*0.1}]}>
                  T1
                </Text>
              </View>
              <Text style ={[styles.fontWhite, {fontSize: height*0.024}]}>
                KOREA LOL/LCK
              </Text>
            </View>
          </View>
          <View style={{marginTop: height*0.1}}>
            <MatchScore
              score={0}
              color={'blue'}
              type={'big'}
            />
          </View>
          <View style={{alignItems:'center', width:width*0.5, marginTop: height*0.03}}>
            <Text style ={[styles.fontWhite, {fontSize: width*0.16, width:width*0.5}]}>
              2025
            </Text>
            <Text style ={[styles.fontWhite, {fontSize: width*0.13, width:width*0.5, marginTop:-height*0.017}]}>
              03/13
            </Text>
            <Text style ={[styles.fontWhite, {fontSize: width*0.2, width:width*0.5, marginTop:-height*0.017, color: "#EA5579"}]}>
              LIVE
            </Text>
          </View>
        </View>

        <View style={[styles.awayTeamContainer, {}]}>
          <View style={[styles.teamLogoContainer, {marginTop: height*0.1, width: width*0.5, borderWidth:0}]}>
            <TeamLogo
              logo={null}
              type={'big'}
              color={'white'}
            />
            <View style={[styles.teamInfoContainer, {height: height*0.124}]}>
              <View style={{height: height*0.1, alignItems: 'center'}}>
                <Text style ={[styles.fontBlue, {fontSize: height*0.045, marginTop: height*0.01}]}>
                  NONSHIM
                </Text>
                <Text style ={[styles.fontBlue, {fontSize: height*0.045, marginTop: -height*0.01}]}>
                  REDFORCE
                </Text>
              </View>
              <Text style ={[styles.fontBlue, {fontSize: height*0.024}]}>
                KOREA LOL/LCK
              </Text>
            </View>
          </View>
          <View style={{marginTop: height*0.1}}>
            <MatchScore
              score={0}
              color={'white'}
              type={'big'}
            />
          </View>
          <View style={{alignItems:'center', width:width*0.5, marginTop: height*0.03}}>
            <Text style ={[styles.fontBlue, {fontSize: width*0.16}]}>
              ON-AIR
            </Text>
          </View>
          <View style={[styles.platformContainer, {width: width*0.4, marginTop: height*0.03}]}>
            <TeamLogo
              logo={null}
              type={'middle'}
              color={'white'}
            />
            <TeamLogo
              logo={null}
              type={'middle'}
              color={'white'}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "column"
  },
  middleContainer: {
    height:0,
    alignItems: 'center',
    top: 0,
    zIndex: 0,
  },
  teamContainer: {
    height: "100%",
    width: "100%",
    flexDirection: 'row',
    top: 0,
    zIndex: -1,
  },
  homeTeamContainer: {
    height: "100%",
    width: "50%",
    backgroundColor: "#30397A",
    flexDirection: 'column',
    alignItems: 'center',
  },
  awayTeamContainer: {
    height: "100%",
    width: "50%",
    backgroundColor: "white",
    flexDirection: 'column',  
    alignItems: 'center',
  },
  teamLogoContainer: {
    alignItems: 'center',
  },
  teamInfoContainer: {
    alignItems: "center"
  },
  platformContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  fontWhite: {
    textAlign: "center", 
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  fontBlue: {
    textAlign: "center", 
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },

});
