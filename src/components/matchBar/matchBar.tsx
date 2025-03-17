/*import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { match } from '../../model/main.dto';
import { Shadow  } from 'react-native-shadow-2';
import { MatchScore } from './matchScore';
import { IsSelected } from '../isSelected';
import { TeamLogo } from '../teamLogo';

interface MatchBarPros {
    match: match | null;  // Assuming match is your interface from earlier
    cover: boolean;   // type will be a string
    color: string;
}

export const MatchBar: React.FC<MatchBarPros> = ({match, cover, color}) => {
  const { width, height } = Dimensions.get('window');
  console.log(width, height);
  const [scoreCover, setScoreCorver] = useState<boolean>(cover)
  const [start, end, style] = color === "white" 
    ? ["#242b5c", "#30397A", [styles.stateTextWhite, styles.teamNameWhite]] 
    : ["#c0c0c0", "#ffffff", [styles.stateTextBlue, styles.teamNameBlue]];

  return (
    <View style={[styles.matchBarContainer, {height:height*0.1, width: width*0.94+6}]}>
    <Shadow 
      startColor={start}
      endColor={end}
      distance={6}
      offset={[0, 6]}
      style={[{ height:(height*0.078)-10, width: (width*0.94)-6}, styles.ShadowContainer]}
    >
      <View
        style={[styles.matchBar, { width:width*0.94, height:height*0.078, backgroundColor: color === 'white' ? "#ffffff" : "#30397A"}]}
      >
        <View style={[styles.state, { width:width*0.22, height:height*0.054, marginRight: -width*0.027}]}>
          <Text style={[style[0], {width: width*0.21, fontSize: width*0.048, marginLeft:width*0.02, marginBottom:-height*0.005, marginTop:-height*0.0035}]}>02/27</Text>
          <Text style={[style[0], {width: width*0.21, fontSize: width*0.072}]}>LIVE</Text>
        </View>
        <Text style={[style[1], {fontSize:width*0.0745, marginRight: width*0.005}]}>
          GEN.G
        </Text>
        <TeamLogo
          logo={null}
          type={"small"}
          color={color}
        />
        {<MatchScore
          score={0}
          color={color}
          type={'small'}
        />}
        <Text style={[style[1], {fontSize:width*0.0745, margin: -width*0.01, marginTop: -height*0.01}]}> : </Text>
        {<MatchScore
          score={0}
          color={color}
          type={'small'}
        />}
        <TeamLogo
          logo={null}
          type={"small"}
          color={color}
        />
        <Text style={[style[1], {fontSize:width*0.0745, marginRight:width*0.018, marginLeft: width*0.005}]}>
          GEN.G
        </Text>
        <IsSelected
          isSelectrd={true}
        />
        
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
    justifyContent: 'center',
  },
  matchBar: {
    flexDirection: 'row',
    
    borderRadius: 10, 
    alignItems: 'center', 
  },
  state: {
    alignItems: 'center',
  },
  stateTextBlue: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  teamNameBlue: {
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  stateTextWhite: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
  teamNameWhite: {
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  }
});*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { match } from '../../model/main.dto';
import { MatchScore } from './matchScore';
import { IsSelected } from '../isSelected';
import { TeamLogo } from '../teamLogo';

interface MatchBarPros {
    match: match;  // Assuming match is your interface from earlier
    color: string;
}

export const MatchBar: React.FC<MatchBarPros> = ({match, color}) => {
  const { width, height } = Dimensions.get('window');
  const [score, setScore] = useState(false)
  const style = color === "white" 
    ? [styles.stateTextWhite, styles.teamNameWhite]
    : [styles.stateTextBlue, styles.teamNameBlue];
  const dateMatch = match?.matchDate?.match(/-(\d{2})-(\d{2})/);
  const formattedDate = dateMatch ? `${dateMatch[1]}/${dateMatch[2]}` : "";
  const onPressScore = () => {
    setScore(!score)
  }
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      
    >
      <View style={[styles.matchBarContainer, {height:height*0.095, width: width*0.94+6}]}>
        <ImageBackground
          resizeMode='contain'
          source={color === "white" 
            ? require('../../assets/match/bar/matchBar_w.png')
            : require('../../assets/match/bar/matchBar_b.png')}
          style={[styles.matchBar, { height:height*0.0875}]}
        >
          <View style={[styles.matchBar, {width:width*0.94, marginTop: -height*0.007}]}>
            <View style={[styles.state, { width:width*0.22, height:height*0.054, marginRight: -width*0.027}]}>
              <Text style={[style[0], {width: width*0.21, fontSize: width*0.048, marginLeft:width*0.02, marginBottom:-height*0.005, marginTop:-height*0.0035}]}>
                {`${formattedDate}`}
              </Text>
              <Text style={[style[0], {width: width*0.21, fontSize: width*0.072}, {color : match.matchState === "live" ? "#EA5579" : style[0].color} ]}>{`${match.matchState}`}</Text>
            </View>
            <Text style={[style[1], {fontSize:width*0.0745, marginRight: width*0.005, width: width*0.132, textAlign: 'right'}]}>
              {`${match.homeTeamInit}`}
            </Text>
            <TeamLogo
              logo={null}
              type={"small"}
              color={color}
            />
            <TouchableOpacity 
              style={styles.matchBar}
              onPress={onPressScore}
            >
              <MatchScore
                score={score === true ? match.homeTeamScore : "?"}
                color={color}
                type={'small'}
              />
              <Text style={[style[1], {fontSize:width*0.0745, margin: -width*0.01, marginTop: -height*0.01}]}> : </Text>
              <MatchScore
                score={score === true ? match.awayTeamScore : "?"}
                color={color}
                type={'small'}
              />
            </TouchableOpacity>
            <TeamLogo
              logo={null}
              type={"small"}
              color={color}
            />
            <Text style={[style[1], {fontSize:width*0.0745, marginRight:width*0.01, marginLeft: width*0.005, width: width*0.132, textAlign: 'left'}]}>
              {`${match.awayTeamInit}`}
            </Text>
            <IsSelected
              isSelectrd={match.isMatchSelected}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  matchBarContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  matchBar: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  state: {
    alignItems: 'center',
  },
  stateTextBlue: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  teamNameBlue: {
    fontFamily: 'built titling sb it',
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  stateTextWhite: {
    textAlign: 'center',
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  },
  teamNameWhite: {
    fontFamily: 'built titling sb it',
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 10.5, // 그림자 반경
  }
});