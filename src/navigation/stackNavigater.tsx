import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './bottomNavigation';
import { MainScreen } from '../screen/main';
import { TeamScreen } from '../screen/team';
import { LeagueScreen } from '../screen/league';
import { MatchScreen } from '../screen/match';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'none',  // 페이지 전환 애니메이션 제거
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeamScreen"
          component={TeamScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeagueScreen"
          component={LeagueScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchScreen"
          component={MatchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
