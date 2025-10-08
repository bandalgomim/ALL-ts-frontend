import React, { useCallback, useEffect, useRef, useState } from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import MainCalendar from '../components/calendar/MainCalendar';
import Logo from '../components/logo';
import { hookMain } from '../hooks/main.hook';
import { MainHeader } from '../components/main/mainHeader';
import LoadingScreen  from '../components/loadingPage';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '../model/navigation.dto';
import { width, height } from '../global';
import { HeadNotch } from '../components/notch';
import { useMainActions, useMainState } from '../context/main.context';
import { getMainResDto } from '../model/main.dto';
import { hookRefetch } from '../hooks/refetch.hook';
import { hookIsLogin } from '../hooks/IAM.hook';
import { PostState } from '../model/config';


const MainScreen = () => {
  const { setMainRes } = useMainActions()  
  const mainRes = useMainState() as PostState<getMainResDto>
  console.log('MainScreen 렌더링,', mainRes.loading);

  const refetch = useCallback(() => {
    return hookMain('GET', null, setMainRes);
  }, [setMainRes]);
  hookRefetch(refetch, setMainRes);


  return mainRes.loading ? (
    <LoadingScreen
    color="white"
    />
  ) : (
    <View style={styles.Container}>
      {/* Removed unnecessary console.log */}
      <HeadNotch/>
      <MainHeader/>
      <View style={[styles.logo]}>
      <View style={{marginLeft: width * 0.18}}>
        <Logo
        color="white"
        />
      </View>
      <View>
        <Text style={[styles.sloganText]}>All  Sports  Scheduler</Text>
      </View>
      </View>
      <MainCalendar
      data={mainRes?.data as getMainResDto}
      />
          
      <View style={[styles.tabBar]} />
      {console.log('Rendering MainScreen')}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    //position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#30397A',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,

    marginTop: height * -0.04,
  },
  banner: {
    backgroundColor: '#b1b4cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  sloganText: {
    width: width,
    fontSize: width * 0.0885,
    marginTop: -height * 0.045,
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  tabBar: {
    position: 'absolute', // 하단 고정
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    height: height * 0.07,
    backgroundColor: '#30397A',
  },
});
export default React.memo(MainScreen);
MainScreen.whyDidYouRender = true;
