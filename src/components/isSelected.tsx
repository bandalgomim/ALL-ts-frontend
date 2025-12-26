import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { hookIsSelected } from '@hooks/isSelected.hook';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TeamPageParamList } from '@model/navigation.dto';
import { height, width } from '@/global';
import { useMainActions } from '@context/main.context';

interface IsSelectedPros {
    isSelected: boolean | null;
    teamId: number | null;
    leagueId: number | null;
    matchId: string | null;
    color?: string;
}

const IsSelected: React.FC<IsSelectedPros> = ({isSelected, teamId, leagueId, matchId, color}) => {
  const { setMainRes } = useMainActions();
  const [state, setState] = useState<boolean | null>(false);
  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigateTeam = useCallback(
    (teamIdNav: number) => {
      navigationTeam.navigate('TeamScreen', { teamId: teamIdNav, key: `TeamScreen-${teamIdNav}-${Date.now()}` });
    },
    [navigationTeam] // 의존성 추가 (useNavigation 결과)
  );

  useEffect(() => {
    setState(isSelected);
  }, [isSelected]);

  const onPressStart = useCallback(async () => {
    setState(!state);
    if (teamId) {

      await hookIsSelected('PATCH', {teamId: teamId}, setMainRes);
      navigateTeam(teamId);
    } else if (leagueId) {
      await hookIsSelected('PATCH', {leagueId: leagueId}, setMainRes);
    } else if (matchId) {
      await hookIsSelected('PATCH', {matchId: matchId}, setMainRes);
    }
  }, [leagueId, matchId, navigateTeam, setMainRes, state, teamId]);
  return (
    <TouchableOpacity
      onPress={onPressStart}
      style={styles.touchableContainer}
    >
      <Image resizeMode="contain" style={styles.starImage} source={state === true
      ? (color !== 'red' ? require('@assets/star/star.png') : require('@assets/star/star_blue.png'))
      : require('@assets/star/star_empty.png')} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
  touchableContainer: {
    height: height * 0.03,
  },
  starImage: {
    width: width * 0.07,
    height: width * 0.07,
    aspectRatio: 1,
  },
});

export default React.memo(IsSelected);
