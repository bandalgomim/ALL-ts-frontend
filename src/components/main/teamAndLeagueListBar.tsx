import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import SearchBar from '@components/searchBar/searchBar';
import { leagueDto, patchMainReqDto, teamDto } from '@model/main.dto';
import { useNavigation } from '@react-navigation/native';
import { LeaguePageParamList, TeamPageParamList } from '@model/navigation.dto';
import TeamOrLeagueLogo from '@components/teamOrLeagueLogo';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { StackNavigationProp } from '@react-navigation/stack';
import { transformToPatchMainReqDto } from './util';
import { width, height } from '@/global';
import { hookMain } from '@hooks/main.hook';

interface ContentsProps {
  teamAndLeagueList: (teamDto | leagueDto)[] | null;
}
interface emptyProps {
  box: null;
}

const TeamAndLeagueListBar: React.FC<ContentsProps> = ({ teamAndLeagueList }) => {
  const [list, setList] = useState<(teamDto | leagueDto | emptyProps)[] | null>(null);
  const [patch, setPatch] = useState<patchMainReqDto>({
    method: 'PATCH',
    data: null,
  });
  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigationLeague = useNavigation<StackNavigationProp<LeaguePageParamList>>();
  const navigateTeam = useCallback(

    (teamId: number) => {
      navigationTeam.navigate('TeamScreen', { teamId: teamId });
    },
    [navigationTeam]
  );

  const navigateLeague = useCallback(
    (leagueId: number) => {
      navigationLeague.navigate('LeagueScreen', { leagueId: leagueId });
    },
    [navigationLeague]
  );

  useEffect(() => {
    if (!teamAndLeagueList) {
      setList(Array(4).fill({ box: null }));
    } else if (teamAndLeagueList.length < 4) {
      const filled = [
        ...teamAndLeagueList,
        ...Array.from({ length: 4 - teamAndLeagueList.length }, () => ({ box: null })),
      ];
      setList(filled);
    } else {
      setList(teamAndLeagueList);
    }
  }, [teamAndLeagueList]);
  useEffect(() => {
    hookMain('PATCH' as string, patch.data, () => {} );
  }, [patch.data]);
  const handleDragEnd = ({ data }: { data: (teamDto | leagueDto)[] }) => {
    const updatedData = data.map((item, index) => ({
      ...item,
      index: index + 1,
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
      const boxStyle = [
        styles.box,
        styles.itemBox,
        index !== list?.length - 1 ? styles.itemBoxMargin : styles.itemBoxLastMargin,
      ];
      if ('box' in item && item.box === null) {
        return (
          <View key={item.index} style={boxStyle}>
            <SearchBar type={null} />
          </View>
        );
      }
      return (
        <ScaleDecorator>
          <View key={item.index} style={boxStyle}>
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
              style={isActive ? styles.touchableActive : styles.touchable}
            >
              <TeamOrLeagueLogo
                logo={'teamId' in item ? item.teamLogo : item.leagueLogo}
                type={'middle'}
                initial={'teamId' in item ? item.teamInit : item.leagueInit}
              />
            </TouchableOpacity>
          </View>
        </ScaleDecorator>
      );
    },
    [list, navigateTeam, navigateLeague]
  );

  const getItemKey = useCallback((item: teamDto | leagueDto, index: number) => {
    if ('teamId' in item) {return `team-${item.teamId}`;}
    if ('leagueId' in item) {return `league-${item.leagueId}`;}
    if ('box' in item) {return `empty-${index}`;}
    return String(index);
  }, []);

  return (
    <View style={[styles.CalendarContainer, styles.calendarSize]}>
      <ImageBackground
        resizeMode="contain"
        style={[styles.ImageBackground, styles.imageSize]}
        source={require('@assets/main/teamListBar_s.png')}
      >
        <View style={styles.flatListContainer}>
          {list ? (
            <DraggableFlatList
              data={list}
              onDragEnd={handleDragEnd}
              keyExtractor={getItemKey}
              renderItem={renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onStartShouldSetResponderCapture={() => true}
            />
          ) : null}
        </View>
        <View style={[styles.searchBarContainer, styles.searchBarPosition]}>
          <SearchBar type="blue" />
        </View>
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
    height: width * 0.42,
    marginTop: 0,
  },
  ImageBackground: {
    position: 'absolute',
    alignItems: 'center',
  },
  imageSize: {
    width: width,
    height: width * 0.42,
  },
  ShadowContainer: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemBox: {
    width: width * 0.125,
    height: width * 0.2,
    marginTop: height * 0.035,
    marginLeft: width * 0.012,
  },
  itemBoxMargin: {
    marginRight: width * 0.079,
  },
  itemBoxLastMargin: {
    marginRight: width * 0.012,
  },
  touchable: {
    opacity: 1,
  },
  touchableActive: {
    opacity: 0.5,
  },
  flatListContainer: {
    width: width * 0.8,
    height: height * 0.118,
  },
  searchBarContainer: {
    transform: [{ rotate: '7deg' }],
  },
  searchBarPosition: {
    height: height * 0.05,
    marginLeft: width * 0.37,
    marginTop: height * -0.009,
  },
});
export default React.memo(TeamAndLeagueListBar);
