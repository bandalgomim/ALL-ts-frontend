import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screen/main';
import { TeamScreen } from '../screen/team';
import { LeagueScreen } from '../screen/league';
import { MatchScreen } from '../screen/match';
import { LoadingTeamScreen } from '../components/loadingPage';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
        <MainStack.Navigator>
            <MainStack.Screen 
                name="Main" 
                component={MainScreen} 
                options={{ headerShown: false }} 
            />
            <MainStack.Screen 
                name="LeagueScreen" 
                component={LeagueScreen} 
                options={{ headerShown: false }} 
            />
            <MainStack.Screen 
                name="TeamScreen"
                component={TeamScreen} 
                options={{ headerShown: false }} 
            />
            <MainStack.Screen 
                name="MatchScreen"
                component={MatchScreen} 
                options={{ headerShown: false }} 
            />
            <MainStack.Screen 
                name="LoadingTeamScreen"
                component={LoadingTeamScreen} 
                options={{ headerShown: false }} 
            />
        </MainStack.Navigator>
  );
};

export default MainStackNavigator;
