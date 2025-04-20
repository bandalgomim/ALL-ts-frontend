import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import SearchBar from '../searchBar/serchBar';
import { leagueDto, patchMainReqDto, teamDto } from '../../model/main.dto';
import { useNavigation } from '@react-navigation/native';
import { LeaguePageParamList, TeamPageParamList } from '../../model/navigation.dto';
import TeamOrLeagueLogo  from '../teamOrLeagueLogo';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { StackNavigationProp } from '@react-navigation/stack';
import { transformToPatchMainReqDto } from './util';
import { width, height } from './../../global';
import { useMain } from '../../hooks/main.hook';
import SerchBar from '../searchBar/serchBar';

interface ContentsProps {
    mode: 'm' | 'w',
    teamAndLeagueList: (teamDto | leagueDto)[] | null
  }
interface emptyProps {
  box: null
}

const TeamAndLeagueListBar: React.FC<ContentsProps>  = ({ mode, teamAndLeagueList }) => {
  const [list, setList] = useState<(teamDto | leagueDto | emptyProps)[] | null>(null);
  const [patch, setPatch] = useState<patchMainReqDto>({
    method: 'PATCH',
    data: null,
  });
  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigationLeague = useNavigation<StackNavigationProp<LeaguePageParamList>>();
  const navigateTeam = useCallback((teamId: number) => {
    navigationTeam.navigate('TeamScreen', { teamId: teamId });
  }, [navigationTeam]); // navigationTeam을 의존성 배열에 추가

  const navigateLeague = useCallback((leagueId: number) => {
    navigationLeague.navigate('LeagueScreen', { leagueId: leagueId });
  }, [navigationLeague]); // navigationLeague를 의존성 배열에 추가

  useEffect(() => {
    if (!teamAndLeagueList) {
      setList(Array(4).fill({ box: null }));
    } else if (teamAndLeagueList.length < 4) {
      const filled = [
        ...teamAndLeagueList,
        ...Array.from({ length: 4 - teamAndLeagueList.length }, () => ({ box: null }))
      ];
      setList(filled);
    } else {
      setList(teamAndLeagueList);
    }
  }, [teamAndLeagueList]);
  useMain(patch.method, patch.data);
  const handleDragEnd = ({ data }: { data: (teamDto | leagueDto)[] }) => {
    // 데이터를 드래그 후 각 항목의 position을 재정렬
    const updatedData = data.map((item, index) => ({
      ...item,
      index: index + 1, // position을 배열 내에서의 위치로 업데이트
    }));
    setPatch({
      method: 'PATCH',
      data: transformToPatchMainReqDto(updatedData),
    });
    setList(updatedData);
  };

  const renderItem = useCallback(
    ({ item, drag, isActive, getIndex }: RenderItemParams<teamDto | leagueDto>) => {
      const index = getIndex();

      if ('box' in item && item.box === null) {
        return (
          <View
            key={item.index}
            style={[
              styles.box,
              {
                width: width * 0.125,
                height: width * 0.2,
                marginTop: height * 0.035,
                marginRight: index !== list?.length - 1 ? width * 0.079 : width * 0.012,
                marginLeft: width * 0.012,
              },
            ]}
          >
            <SerchBar
              type={null}
            />
          </View>
        )
      }

      return (
        <ScaleDecorator>
          <View
            key={item.index}
            style={[
              styles.box,
              {
                width: width * 0.125,
                height: width * 0.2,
                marginTop: height * 0.035,
                marginRight: index !== list?.length - 1 ? width * 0.079 : width * 0.012,
                marginLeft: width * 0.012,
              },
            ]}
          >
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
              style={[{ opacity: isActive ? 0.5 : 1 }]}
            >
              <TeamOrLeagueLogo logo={'teamId' in item ? item.teamLogo : item.leagueLogo} type={'middle'} />
            </TouchableOpacity>
          </View>
        </ScaleDecorator>
      );
    },
    [list, navigateTeam, navigateLeague] // 필요한 의존성만 추가
  );
  return (
    <View style={[styles.CalendarContainer, {width: width, height: mode === 'm' ? width * 0.42 : width, marginTop: -width * 0.0 }]}>
        <ImageBackground
          resizeMode="contain"
          style={[styles.ImageBackground, {width:width, height: mode === 'm' ? width * 0.42 : width * 0.42}]}
          source={ mode === 'm' ? require('./../../assets/main/teamListBar_s.png') : require('./../../assets/main/teamListBar_s.png')}
        >
          <View style={[{width: width * 0.8, height: height * 0.118 }]}>
            {list ? <DraggableFlatList
              data={list}
              onDragEnd={handleDragEnd} // 위치가 바뀔 때마다 position 업데이트
              keyExtractor={(item: teamDto | leagueDto, index: number) => index.toString()}
              renderItem={renderItem}
              horizontal={true} // 가로 스크롤로 변경
              showsHorizontalScrollIndicator={false} // 수평 스크롤바 숨기기
              showsVerticalScrollIndicator={false} // 수직 스크롤바 숨기기 (필요한 경우)
            /> : null}
          </View>
          <View style={[styles.serchBarContainer, {height: height * 0.05, marginLeft: width * 0.37, marginTop:height * -0.009}]}>
            <SearchBar
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

TeamAndLeagueListBar.whyDidYouRender = true;
export default React.memo(TeamAndLeagueListBar);
