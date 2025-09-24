import React, { useContext, useCallback, useEffect } from 'react';
import {  Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { width, height } from '../../global';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserPageParamList } from '../../model/navigation.dto';
import { localData } from '../../IAM/localData';

export const MainHeader = () => {
  const [icon, setIcon] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchIcon = async () => {
      const fetchedIcon = await localData.get('icon') as string;
      setIcon(fetchedIcon);
    };
    fetchIcon();
  }, []);
  const navigationUser = useNavigation<StackNavigationProp<UserPageParamList>>();
  const onPress = useCallback(async () => {
    navigationUser.navigate('UserScreen', {state: true});
  }, []);

  return (
    <View style={[styles.header, {width: width * 0.8, height: height * 0.04, marginBottom: height * 0.01}]}>
      <TouchableOpacity style={[styles.myPage,{}]} >
      </TouchableOpacity>
      <TouchableOpacity style={[styles.myPage,{marginTop: height * 0.005}]} onPress={onPress}>
        {icon ? <Image
          source={{ uri: icon }}
          style={{ width: width * 0.1, height: width * 0.1, borderRadius: (width * 0.1) / 2 }}
        /> :
        <Icon name={'person'} size={30} color={'white'} />}
        <Text style={[styles.myPageText,{marginTop: -height * 0.005}]}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );z
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',   // 가로 배치
    justifyContent: 'space-between',  // 양 끝 정렬
    alignItems: 'center',   // 수직 정렬 (선택 사항)
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  ShadowContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  myPage: {
  },
  myPageText: {
    color: 'white',
    fontFamily: '',
  },
});
