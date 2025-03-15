import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import MainCalendar from '../components/calendar/MainCalendar';
import TeamCalendar from '../components/calendar/TeamCalendar';
import LeagueCalendar from '../components/calendar/LeagueCalendar';
import { MatchBar } from '../components/matchBar/matchBar';
import { MatchLogo } from '../components/matchBar/matchLogo';
import { Logo } from '../components/logo';
import { Match } from '../components/match';

export const TestScreen = () => {
    return (
      <Match
        match={null}
      />
      );
}