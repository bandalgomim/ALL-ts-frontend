import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import MainScreen from '@screens/main';
import TeamScreen from '@screens/team';
import LeagueScreen from '@screens/league';
import MatchScreen from '@screens/match';
import IAMScreen from '@screens/IAM';
import CustomHeader from '@components/customHeader';
import UserScreen from '@screens/user';
import StartScreen from '@screens/start';
import OnboardingScreen from '@screens/onboarding';

const Stack = createStackNavigator();

const StackNavigator = () => {

  const linking = {
    prefixes: ['myapp://'], // 딥 링크의 기본 접두사 설정
    config: {
      screens: {
        MainScreen: '',
        TeamScreen: 'team/:id',  // 예시: myapp://team/1
        LeagueScreen: 'league/:id',
        MatchScreen: 'match/:matchId', // 예시: myapp://match/12345
        IAMScreen: 'iam', // 예시: myapp://iam
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
    >
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
            name="StartScreen"
            component={StartScreen}
            options={{ freezeOnBlur: true }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ freezeOnBlur: true }}
          />
          <Stack.Screen
            name="TeamScreen"
            component={TeamScreen}
            options={{ freezeOnBlur: true }}
          />
          <Stack.Screen
            name="LeagueScreen"
            component={LeagueScreen}
            options={{ freezeOnBlur: true }}
          />
          <Stack.Screen
            name="MatchScreen"
            component={MatchScreen}
            options={{ freezeOnBlur: true }}
          />
          <Stack.Screen
            name="IAMScreen"
            component={IAMScreen}
            options={{ gestureEnabled: false, freezeOnBlur: true }}
          />
          <Stack.Screen
            name="UserScreen"
            component={UserScreen}
            options={{ freezeOnBlur: true }}
          />
          <Stack.Screen
            name='OnboardingScreen'
            component={OnboardingScreen}
            options={{freezeOnBlur: true}}
            />
        </Stack.Navigator>
        <CustomHeader/>
    </NavigationContainer>
  );
};

export default StackNavigator;
