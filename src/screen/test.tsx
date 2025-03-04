import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import MainCalendar from '../components/calendar/MainCalendar';
import TeamCalendar from '../components/calendar/TeamCalendar';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import { MatchBar } from '../components/matchBar/matchBar';
import { MatchLogo } from '../components/matchBar/matchLogo';

export const TestScreen = () => {
    return (
        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}}>
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
      );
}