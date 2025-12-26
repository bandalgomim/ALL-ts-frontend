import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainPageParamList } from '@model/navigation.dto';
import { width, height } from '@/global';

interface MainTabBarProps {
  color: 'blue' | 'white';
}

const MainTabBar: React.FC<MainTabBarProps> = ({ color }) => {
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.navigate('MainScreen', undefined);
  };

  return (
    <Pressable onPress={navigateMain}>
      {({ pressed }) => (
        <View
          style={[
            styles.tabBar,
            { width: width, height: height * 0.07 },
            {
              backgroundColor: pressed
                ? (color === 'blue' ? '#1a2150' : '#e0e0e0') // 터치 시 색상
                : (color === 'blue' ? '#30397A' : 'white')
            }
          ]}
        >
          <Icon name={'home'} size={30} color={color === 'blue' ? 'white' : '#30397A'} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',  // 양 끝 정렬
    alignItems: 'center',   // 수직 정렬 (선택 사항)
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
export default MainTabBar;
