import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainPageParamList } from '../../model/navigation.dto';

const MainTabBar = () => {

  const navigationMain = useNavigation<NavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.navigate('MainScreen', null);
  };
  const { width, height } = Dimensions.get('window');
  return (
    <TouchableOpacity onPress={()=>{navigateMain();}}>
        <View style={[styles.tabBar, {width: width, height: height * 0.08}]}>
                <Icon name={'home'} size={30} color={'white'} />
                <Text>Home</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',  // 양 끝 정렬
    alignItems: 'center',   // 수직 정렬 (선택 사항)
    backgroundColor: 'blue',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default MainTabBar;
