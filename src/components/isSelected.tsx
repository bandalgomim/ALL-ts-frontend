import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet,  Image, TouchableOpacity } from 'react-native';
import { hookIsSelected } from '../hooks/isSelected.hook';
import { ApiContext } from '../context/context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TeamPageParamList } from '../model/navigation.dto';
import { width } from '../global';
interface IsSelectedPros {
    isSelected: boolean | null;
    teamId: number | null;
    leagueId: number | null;
    matchId: number | null;
}

const IsSelected: React.FC<IsSelectedPros> = ({isSelected, teamId, leagueId, matchId}) => {
  const { setMainRes, setLogin } = useContext(ApiContext);
  const [state, setState] = useState<boolean | null>(false);
  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigateTeam = useCallback(
    (teamIdNav: number) => {
      navigationTeam.replace('TeamScreen', { teamId: teamIdNav });
    },
    [navigationTeam] // 의존성 추가 (useNavigation 결과)
  );

  useEffect(() => {
    setState(isSelected);
  }, [isSelected]);

  const onPressStart = useCallback(async () => {
    if (teamId) {
      await hookIsSelected('PATCH', {teamId: teamId}, setMainRes, setLogin);
      navigateTeam(teamId);
    } else if (leagueId) {
      await hookIsSelected('PATCH', {leagueId: leagueId}, setMainRes, setLogin);
    } else if (matchId) {
      await hookIsSelected('PATCH', {matchId: matchId}, setMainRes, setLogin);
    }
    setState(!state);
  }, [leagueId, matchId, navigateTeam, setLogin, setMainRes, state, teamId]);
  return (
    <TouchableOpacity
      onPress={onPressStart}
    >
      <Image resizeMode="contain" style={[styles.container, {width: width * 0.07, height: width * 0.07}]} source={state === true
      ? require('./../assets/star/star.png')
      : require('./../assets/star/star_empty.png')} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
});

export default React.memo(IsSelected);
