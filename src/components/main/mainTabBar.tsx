import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainPageParamList } from '../../model/navigation.dto';

interface MainTabBarProps {
  color: 'blue' | 'white';
}

const MainTabBar : React.FC<MainTabBarProps>  = ({ color }) => {

  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.replace('MainScreen', undefined);
  };
  const { width, height } = Dimensions.get('window');
  return (
    <TouchableOpacity onPress={()=>{navigateMain();}}>
        <View style={[styles.tabBar, {width: width, height: height * 0.07}, {backgroundColor: color === 'blue' ? '#30397A' : 'white'}]}>
                <Icon name={'home'} size={30} color={color === 'blue' ? 'white' : '#30397A'} />
                <Text style={[{color: color === 'blue' ? 'white' : '#30397A'}]}>HOME</Text>
        </View>
    </TouchableOpacity>
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
