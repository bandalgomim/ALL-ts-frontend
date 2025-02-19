import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './bottomNavigation';
import Header from '../components/header/header';
import MyPostScreen from '../screen/myPage/myPost';
import HomeScreen from '../screen/home/home';

const Stack = createStackNavigator();
const CustomHeader = () => <Header />;

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: CustomHeader, // 커스텀 헤더를 적용
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MyPostScreen"
          component={MyPostScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
