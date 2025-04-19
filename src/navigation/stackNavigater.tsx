import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screen/main';
import { TeamScreen } from '../screen/team';
import LeagueScreen from '../screen/league';
import MatchScreen  from '../screen/match';
import IAMScreen  from '../screen/IAM';
import StartScreen from '../screen/start';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // animation: 'none' 제거 (애니메이션 활성화)
          headerShown: false,
          gestureEnabled: true,           // 스와이프 활성화
          gestureDirection: 'horizontal', // 가로 방향 스와이프
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // iOS 스타일 전환
        }}
      >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
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
        <Stack.Screen
          name="IAMScreen"
          component={IAMScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
