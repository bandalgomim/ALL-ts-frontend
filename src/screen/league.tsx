import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import { MatchBar } from '../components/matchBar/matchBar';

export const LeagueScreen = () => {
    return (
        <View style={styles.Container}>
          <LeagueCalendar/>
          <ScrollView style={{paddingTop: 30}}>
            <MatchBar
              match={null}
              cover={false}
            />
            <MatchBar
              match={null}
              cover={false}
            />
            <MatchBar
              match={null}
              cover={false}
            />
            <MatchBar
              match={null}
              cover={false}
            />
            <MatchBar
              match={null}
              cover={false}
            />
                        <MatchBar
              match={null}
              cover={false}
            />
          </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
});