import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { SerchBar } from '../serchBar/serchBar';
import { league, team } from '../../model/main.dto';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LeaguePageParamList, LoadingTeamPageParamList } from '../../model/navigation.dto';
import { TeamLogo } from '../teamLogo';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';

interface ContentsProps {
    mode: 'm' | 'w',
    teamAndLeagueList: (team | league)[]
  }

export const TeamAndLeagueListBar: React.FC<ContentsProps>  = ({ mode, teamAndLeagueList }) => {
  const { width, height } = Dimensions.get('window');

  const [list, setList] = useState<(team | league)[]>([]);
  const navigationTeamLoading = useNavigation<NavigationProp<LoadingTeamPageParamList>>();
  const navigationLeague = useNavigation<NavigationProp<LeaguePageParamList>>();

  const navigateTeam = (teamId: number) => {
    navigationTeamLoading.navigate('LoadingTeamScreen', { teamId: teamId });
  };
  const navigateLeague = (leagueId: number) => {
    navigationLeague.navigate('LeagueScreen', { leagueId: leagueId });
  };

  useEffect(() => {
    if (teamAndLeagueList) {
      setList(teamAndLeagueList);
    }
  }, [teamAndLeagueList]);

  const handleDragEnd = ({ data }: { data: (team | league)[] }) => {
    // 데이터를 드래그 후 각 항목의 position을 재정렬
    const updatedData = data.map((item, index) => ({
      ...item,
      index: index + 1, // position을 배열 내에서의 위치로 업데이트
    }));
    setList(updatedData);
  };
  const renderItem = ({ item, drag, isActive }: RenderItemParams<(team | league)>) => {
    return (
      <ScaleDecorator>
        <View key={item.index} style={[styles.box, {width: width * 0.125, height: width * 0.2, marginTop: height * 0.035, marginRight: item.index !== teamAndLeagueList.length + 1 ? width * 0.079 : width * 0.012, marginLeft: width * 0.012 } ]}>
          <TouchableOpacity
            onLongPress={drag}
            onPress={() => {
              if ('teamId' in item) {
                navigateTeam(item.teamId);
              } else {
                navigateLeague(item.leagueId);
              }
            }}
            disabled={isActive}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[{ opacity: isActive ? 0.5 : 1}]}
          >

            <TeamLogo
              logo={'teamId' in item ? item.teamLogo : item.leagueLogo}
              type={'middle'}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </ScaleDecorator>
    );
  };
  return (
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width * 0.42 : width}]}>
        <ImageBackground
          resizeMode="contain"
          style={[styles.ImageBackground, {width:width, height: mode === 'm' ? width * 0.42 : width * 0.42}]}
          source={ mode === 'm' ? require('./../../assets/main/teamListBar_s.png') : require('./../../assets/main/teamListBar_s.png')}
        >
          <View style={[{width: width * 0.8, height: height * 0.118 }]}>
            {list ? <DraggableFlatList
              data={list}
              onDragEnd={handleDragEnd} // 위치가 바뀔 때마다 position 업데이트
              keyExtractor={(item) => item.index.toString()}
              renderItem={renderItem}
              horizontal={true} // 가로 스크롤로 변경
              showsHorizontalScrollIndicator={false} // 수평 스크롤바 숨기기
              showsVerticalScrollIndicator={false} // 수직 스크롤바 숨기기 (필요한 경우)
            /> : null}
          </View>
          <View style={[styles.serchBarContainer, {height: height * 0.05, marginLeft: width * 0.37, marginBottom:height * 0.028}]}>
            <SerchBar
              type="blue"
            />
          </View>
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
  ShadowContainer: {
    borderRadius: '5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  serchBarContainer: {
    transform: [{ rotate: '7deg' }],
  },
});
