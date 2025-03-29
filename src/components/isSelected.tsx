import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { patchIsSelectedReqDto } from '../model/isSelected.dto';
import { useIsSelected } from '../hooks/isSelected.hook';

interface IsSelectedPros {
    isSelected: boolean | null;
    teamId: number | null;
    leagueId: number | null;
    matchId: number | null;
}

const IsSelected: React.FC<IsSelectedPros> = ({isSelected, teamId, leagueId, matchId}) => {
  const [state, setState] = useState<boolean | null>(false);
  const [indicator, setIndicator] = useState<boolean>(false);
  const { width } = Dimensions.get('window');
  // 원래 컴포넌트 코드...

  const [isSelectedState, setIsSelectedState] = useState<patchIsSelectedReqDto>({
    method: 'PATCH',
    data: null,
  });
  useEffect(() => {
    setState(isSelected);
    setIndicator(isSelected as boolean);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onPressStart = ()=>{
    setIndicator(!state);
  };
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