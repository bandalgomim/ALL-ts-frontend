import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global';
import { Dimensions, Platform } from 'react-native';
import MainStackNavigator from './MainStackNavigator';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName: string;

  switch (routeName) {
    case 'MAIN':
      iconName = 'home';
      break;
    default:
      iconName = 'person'; // Default icon
  }
  return <Icon name={iconName} size={size} color={color} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: Platform.OS === 'ios' ? width * 0.03 : width * 0.035, // 폰트 크기
          marginBottom: Platform.OS === 'android' ? height * 0.01 : 0, // 탭바 내 글씨
        },
        tabBarStyle: {
          //display: route.name === 'MAIN' ? 'none' : 'flex', // MAIN에서 숨기기
          height: Platform.OS === 'ios' ? height * 0.08 : height * 0.07, // 탭바 높이
        },
        animationEnabled: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="MAIN" component={MainStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
