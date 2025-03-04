import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainCalendar from '../components/calendar/MainCalendar';
import TeamCalendar from '../components/calendar/TeamCalendar';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import { MatchBar } from '../components/matchBar/matchBar';

export const TeamScreen = () => {
    return (
        <View style={styles.Container}>
          <TeamCalendar/>

        </View>
        
      );
}

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',  
    alignItems: 'center',
    backgroundColor: '#30397A'
  },
});

