import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet,  Image, TouchableOpacity } from 'react-native';
import { patchIsSelectedReqDto } from '../model/isSelected.dto';
import { useIsSelected } from '../hooks/isSelected.hook';
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
  const { mainRes } = useContext(ApiContext);
  const [state, setState] = useState<boolean | null>(false);
  const [indicator, setIndicator] = useState<boolean>(false);
  const prevMain = useRef(mainRes)
  const navigationTeam = useNavigation<StackNavigationProp<TeamPageParamList>>();
  const navigateTeam = (teamId: number) => {

    navigationTeam.replace('TeamScreen', { teamId: teamId });
  };
  const [isSelectedState, setIsSelectedState] = useState<patchIsSelectedReqDto>({
    method: 'PATCH',
    data: null,
  });
  useEffect(() => {
    setState(isSelected);
    setIndicator(isSelected as boolean);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  useEffect(() => {
    if (prevMain.current !== mainRes && teamId) {
      navigateTeam(teamId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainRes]);

  useEffect(() => {
    if (indicator !== state) {
      if (teamId) {
        setIsSelectedState({
          method: 'PATCH',
          data: {teamId: teamId},
        });
      } else if (leagueId) {
        setIsSelectedState({
          method: 'PATCH',
          data: {leagueId: leagueId},
        });
      } else if (matchId) {
        setIsSelectedState({
          method: 'PATCH',
          data: {matchId: matchId},
        });
      } setState(indicator);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ indicator ]);
  useIsSelected(isSelectedState.method as string, isSelectedState.data);

  const onPressStart = useCallback(() => {
    setIndicator((prev) => !prev);
  }, []);
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
