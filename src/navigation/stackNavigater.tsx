import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import BottomTabNavigator from './bottomNavigation';
import { MainScreen } from '../screen/main';
import { TeamScreen } from '../screen/team';
import { LeagueScreen } from '../screen/league';
import { TestScreen } from '../screen/test';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
          name="TestScreen"
          component={TestScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
