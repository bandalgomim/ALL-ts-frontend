import React, { useContext, useCallback } from 'react';
import {  Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { width, height } from '../../global';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '../../model/navigation.dto';

export const MainHeader = () => {
  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();
  return (
    <View style={[styles.header, {width: width * 0.8, height: height * 0.04, marginBottom: height * 0.01}]}>
      <TouchableOpacity style={[styles.myPage,{}]}>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.myPage,{marginTop: height * 0.005}]} onPress={()=>navigationIAM.navigate('IAMScreen')}>
        <Icon name={'person'} size={30} color={'white'} />
        <Text style={[styles.myPageText,{marginTop: -height * 0.005}]}>USER</Text>
      </TouchableOpacity>
    </View>
  );
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
