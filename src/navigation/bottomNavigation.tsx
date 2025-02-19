import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyPageScreen } from '../screen/myPage/myPage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global';
import { Dimensions, Platform } from 'react-native';
import HomeScreen from '../screen/home/home';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName: string;

  switch (routeName) {
    case '홈':
      iconName = 'person';
      break;
    case '글쓰기':
      iconName = 'person';
      break;
    case '경기 짤방':
      iconName = 'person';
      break;
    case '커뮤니티':
      iconName = 'person';
      break;
    case '마이페이지':
      iconName = 'person';
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
          height: Platform.OS === 'ios' ? height * 0.1 : height * 0.08, // 탭바 높이
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="경기 짤방" component={MyPageScreen} />
      <Tab.Screen name="글쓰기" component={MyPageScreen} />
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="커뮤니티" component={MyPageScreen} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
