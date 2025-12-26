import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { TeamPageParamList } from '@model/navigation.dto';
import { getLeagueResDto, teamDto } from '@model/league.dto';
import TeamOrLeagueLogo from '@components/teamOrLeagueLogo';
import { StackNavigationProp } from '@react-navigation/stack';
import { width, height } from '@/global';
import DraggableFlatList from 'react-native-draggable-flatlist';

interface LeageTeamListBarProps {
  data: getLeagueResDto;
}
const LeageTeamListBar: React.FC<LeageTeamListBarProps> = ({ data }) => {
  const navigation = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigateTeam = (teamId: number) => {
    navigation.navigate('TeamScreen', { teamId: teamId });
  };

  const renderItem = useCallback(( {item, index}: { item: teamDto, index: number } ) => {
    if (String(item.rank) === '0') {return null;}
    const isLast = index === data.teamList.length - 1;
    return (
      <View key={index} style={[styles.box, styles.boxSize, isLast ? styles.boxMarginLast : styles.boxMargin]}>
        <TouchableOpacity
          style={styles.teamButton}
          onPress={()=>{navigateTeam(item.teamId);}}
        >
          <TeamOrLeagueLogo
            logo={item.teamLogo}
            type={'middle'}
            initial={item.teamInit}
          />
          <Text style={styles.teamName}>{item.teamInit}</Text>
        </TouchableOpacity>
      </View>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.teamList]);
  return (
    <View style={[styles.CalendarContainer, styles.calendarSize]}>
      <ImageBackground
        resizeMode="contain"
        style={[styles.ImageBackground, styles.imageBackgroundSize]}
        source={require('@assets/league/teamList.png')}
      >
        <DraggableFlatList
          style={[styles.scrollView, styles.scrollViewWidth]}
          data={data.teamList}
          horizontal={true}
          keyExtractor={(item: teamDto, index: number) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
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
  calendarSize: {
    width: width,
    height: width * 0.320,
    marginTop: height * 0.01,
    marginBottom: -height * 0.036,
  },
  ImageBackground: {
    position: 'absolute',
    alignItems: 'center',
  },
  imageBackgroundSize: {
    width: width,
    height: width * 0.32,
  },
  scrollView: {
    transform: [{ rotate: '2deg' }],
  },
  scrollViewWidth: {
    width: width * 0.8,
  },
  ShadowContainer: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxSize: {
    width: width * 0.13,
    height: width * 0.1,
    marginTop: height * 0.049,
    marginLeft: width * 0.012,
  },
  boxMargin: {
    marginRight: width * 0.074,
  },
  boxMarginLast: {
    marginRight: width * 0.012,
  },
  teamButton: {
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
});

export default React.memo(LeageTeamListBar);
