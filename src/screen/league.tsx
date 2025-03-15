import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import { MatchBar } from '../components/matchBar/matchBar';
import LeagueHeader from '../components/leagueHeader';
import { LeageTeamListBar } from '../components/leageTeamList';
import { Logo } from '../components/logo';

export const LeagueScreen = () => {
  const { width, height } = Dimensions.get('window');
    return (
        <View style={styles.Container}>
          <LeagueHeader/>
          <LeageTeamListBar/>
          <LeagueCalendar/>
          <ScrollView style={{paddingTop: 5}}>
            <MatchBar
              match={null}
              cover={false}
              color={'blue'}
            />
            <MatchBar
              match={null}
              cover={false}
              color={'blue'}
            />
            <MatchBar
              match={null}
              cover={false}
              color={'blue'}
            />
            <MatchBar
              match={null}
              cover={false}
              color={'blue'}
            />
            <MatchBar
              match={null}
              cover={false}
              color={'blue'}
            />
                        <MatchBar
              match={null}
              cover={false}
            color={'blue'}/>
          </ScrollView>
          <View style={[styles.logo, {bottom: -height*0.03}]}>
            <Logo
              color="blue"
            />
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex:1
  },
  logo: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: -1, // B 요소 뒤로 보냄
  }
});