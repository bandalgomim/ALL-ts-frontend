import React from 'react';
import { View, StyleSheet, Dimensions, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { SerchBar } from '../serchBar';
import { team } from '../../model/main.dto';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TeamPageParamList } from '../../model/navigation.dto';
import { TeamLogo } from '../teamLogo';

interface ContentsProps {
    mode: "m" | "w",
    teamList: team[]
  }

export const TeamListBar: React.FC<ContentsProps>  = ({ mode, teamList }) => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation<NavigationProp<TeamPageParamList>>();
  const navigateTeam = (teamId: number) => {
    navigation.navigate("TeamScreen", { teamId: teamId });
  };

  return (
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width*0.42 : width}]}>
        <ImageBackground
          resizeMode="contain" 
          style={[styles.ImageBackground, {width:width, height: mode === 'm' ? width*0.42 : width*0.42}]} 
          source={ mode === 'm' ? require('./../../assets/main/teamListBar_s.png') : require('./../../assets/main/teamListBar_s.png')}
        >
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            style={[styles.scrollView, {width: width*0.8}]}
          >
            {(teamList ?? []).map(( team, index) => (
              <View key={index} style={[styles.box, {width: width*0.13, height: width*0.1, marginTop: height*0.04, marginRight: index !== 4 ? width*0.093 : 0}]}>
                <Shadow startColor='#bfbfbf'
                  endColor='#ffffff'
                  distance={6}
                  offset={[0, 3]}
                  style={[{ width:width*0.13-6, height: width*0.13-6}, styles.ShadowContainer]}
                >
                  <TouchableOpacity
                    onPress={()=>{navigateTeam(team.teamId)}}
                  >
                    <TeamLogo
                      logo={team.teamLogo}
                      type={"middle"}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </Shadow>
              </View>
            )) } 
          </ScrollView>
          <View style={[styles.serchBarContainer, {height: height*0.05, marginLeft: width*0.37, marginBottom:height*0.028}]}>
            <SerchBar
              type="blue"
            />
          </View>
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
  serchBarContainer: {
    //borderWidth: 1,
    transform: [{ rotate: '7deg' }]
  }
});