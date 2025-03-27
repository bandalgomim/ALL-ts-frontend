import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import TeamCalendar from '../components/calendar/TeamCalendar';
import { MatchBar } from '../components/matchBar/matchBar';
import TeamHeader from '../components/teamHeader';
import { Logo } from '../components/logo';
import { ApiContext } from '../context/context';
import { match } from '../model/main.dto';

export const TeamScreen = () => {
  const {teamReq} = useContext(ApiContext);

  const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.Container}>
        <TeamHeader/>
        <TeamCalendar/>
        <ScrollView>
          {teamReq?.data?.matchList?.map((match: match, index: number) => {
            return (
              <MatchBar
                isVisible={null}
                setIsVisible={null}
                key={index}
                match={match}
                color={'white'}
              />
            );
          })}
        </ScrollView>
        <View style={[styles.logo, {bottom: -height * 0.03}]}>
          <Logo
            color="white"
          />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  Container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#30397A',
    zIndex:1,
  },
  logo: {
    position: 'absolute',
    zIndex: -1, // B 요소 뒤로 보냄
    flexDirection: 'row',
    justifyContent: 'flex-start',  // 가로 방향 중�� 정��
    alignItems: 'flex-end',
  },
});

