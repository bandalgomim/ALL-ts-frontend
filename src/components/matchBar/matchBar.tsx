import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, StyleProp, TextStyle, ViewStyle, Image } from 'react-native';
import { match } from '../../model/main.dto';
import { Shadow  } from 'react-native-shadow-2';
import { MatchLogo } from './matchLogo';
import { MatchScore } from './matchScore';
import { IsSelected } from './isSelected';

interface MatchBarPros {
    match: match | null;  // Assuming match is your interface from earlier
    cover: boolean   // type will be a string
}

export const MatchBar: React.FC<MatchBarPros> = ({match, cover}) => {
  const { width, height } = Dimensions.get('window');
  const [scoreCover, setScoreCorver] = useState<boolean>(cover)

  return (
    <View style={[styles.matchBarContainer, {height:(height*0.1), width: (width*0.94)+6}]}>
    <Shadow startColor='#b9b9b9'
      endColor='#ffffff'
      distance={6}
      offset={[0, 6]}
      style={[{ height:(height*0.078)-10, width: (width*0.94)-6}, styles.ShadowContainer]}
    >
      <View
        style={[styles.matchBar, { width:width*0.94, height:height*0.078 }]}
      >
        <View style={[styles.state, { width:width*0.22, height:height*0.054, marginRight: -width*0.027}]}>
          <Text style={[styles.stateText, {width: width*0.21, fontSize: width*0.048, marginLeft:width*0.02, marginBottom:-height*0.005, marginTop:-height*0.0035}]}>02/27</Text>
          <Text style={[styles.stateText, {width: width*0.21, fontSize: width*0.072}]}>LIVE</Text>
        </View>
        <Text style={[styles.teamName, {fontSize:width*0.0745, marginRight: width*0.005}]}>
          GEN.G
        </Text>
        <MatchLogo
          logo={null}
          shadowStart="#242b5c"
          shadowEnd="#30397A"
        />
        {<MatchScore
          score={0}
          shadowStart="#242b5c"
          shadowEnd="#30397A"
        />}
        <Text style={[styles.teamName, {fontSize:width*0.0745, margin: -width*0.01, marginTop: -height*0.01}]}> : </Text>
        {<MatchScore
          score={0}
          shadowStart="#242b5c"
          shadowEnd="#30397A"
        />}
        <MatchLogo
          logo={null}
          shadowStart="#242b5c"
          shadowEnd="#30397A"
        />
        <Text style={[styles.teamName, {fontSize:width*0.0745, marginRight:width*0.018, marginLeft: width*0.005}]}>
          GEN.G
        </Text>
        <TouchableOpacity>
          <IsSelected
            isSelectrd={true}
          />
        </TouchableOpacity>
      </View>
    </Shadow>
    </View>
  )
}

const styles = StyleSheet.create({
  matchBarContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  ShadowContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  matchBar: {
    flexDirection: 'row',
    backgroundColor:'#30397A',
    borderRadius: 10, 
    alignItems: 'center', 
  },
  state: {
    alignItems: 'center',
  },
  stateText: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  teamName: {
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  }
});
