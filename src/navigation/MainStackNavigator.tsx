import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import MainScreen from '../screen/main';
import TeamScreen from '../screen/team';
import LeagueScreen from '../screen/league';
import MatchScreen from '../screen/match';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // 스와이프로 뒤로가기 활성화
        gestureDirection: 'horizontal', // 가로 방향 스와이프
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // iOS 스타일 트랜지션
      }}
    >
      <MainStack.Screen name="MainScreen" component={MainScreen} />
      <MainStack.Screen name="TeamScreen" component={TeamScreen} />
      <MainStack.Screen name="LeagueScreen" component={LeagueScreen} />
      <MainStack.Screen name="MatchScreen" component={MatchScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
