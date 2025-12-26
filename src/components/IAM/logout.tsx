import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import { width, height } from '@/global';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '@model/navigation.dto';
import { localData } from '@IAM/localData';

const LogoutButton = () => {
  const uri = require('@assets/match/platform/youtube.png');
  const navigationIAM = useNavigation<StackNavigationProp<IAMPageParamList>>();

  const navigateIAM = useCallback(() => {
      navigationIAM.replace('IAMScreen', {state: true});
  }, [navigationIAM]);

  const onPress = useCallback(async () => {
    await localData.delete('RefreshToken');
    await localData.delete('Authorization');
    if (await localData.get('icon')) {
      await localData.delete('icon');
    }
    navigateIAM();
  }, [navigateIAM]);


  return (
    <TouchableOpacity style={styles.authContainer} onPress={onPress}>
      <ImageBackground
        resizeMode="contain"
        source={uri}
        style={[styles.box]}
      >
        <Text style={[styles.boxText]}>
            로그아웃
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    alignItems: 'center',
  },
  box: {
    width: width * 0.2,
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    marginTop: -height * 0.008,
    fontFamily: 'sb-it-ver1',
    color: 'white',
    fontSize: width * 0.06,
    width: width * 0.21,
    textAlign: 'center',
  },

});

export default React.memo(LogoutButton);