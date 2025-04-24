import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screen/main';
import TeamScreen from '../screen/team';
import LeagueScreen from '../screen/league';
import MatchScreen  from '../screen/match';
import IAMScreen  from '../screen/IAM';
import CustomHeader from '../components/customHeader';
const Stack = createStackNavigator();


const StackNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // animation: 'none'
            headerShown: false,
            gestureEnabled: true,           // 스와이프 활성화
            gestureDirection: 'horizontal', // 가로 방향 스와이프
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // iOS 스타일 전환
          }}
        >
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen
            name="TeamScreen"
            component={TeamScreen}
          />
          <Stack.Screen
            name="LeagueScreen"
            component={LeagueScreen}
          />
          <Stack.Screen
            name="MatchScreen"
            component={MatchScreen}
          />
          <Stack.Screen
            name="IAMScreen"
            component={IAMScreen}
          />
        </Stack.Navigator>
        <CustomHeader/>
    </NavigationContainer>
  );
};

export default StackNavigator;
