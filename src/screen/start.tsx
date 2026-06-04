/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import LoadingScreen  from '@/screen/Loading.screen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainPageParamList, OnboardingPageParamList } from '@model/navigation.dto';
import { hookVersionCheck } from '@hooks/IAM.hook';
import { Alert, Linking } from 'react-native';
import { localData, localDataMmkv } from '@IAM/localData';

const StartScreen = () => {
  const navigationMain = useNavigation<StackNavigationProp<MainPageParamList>>();
  const navigateMain = () => {
    navigationMain.replace('MainScreen', undefined);
  };
  const navigationOnboarding = useNavigation<StackNavigationProp<OnboardingPageParamList>>();
  const navigateOnboarding = () => {
    navigationOnboarding.replace('OnboardingScreen', undefined);
  };

useEffect(() => {
    const runStartTask = async () => {
    try {
        const verCheck = await hookVersionCheck();
        if (!localDataMmkv.get('mode')) {
          localDataMmkv.set('mode', 'w');
        }
        if (verCheck) {
          if(await localData.get('onbording') === 'true') {
            navigateMain();
          } else {
            navigateOnboarding();
          }
        } else {
            Alert.alert(
                '업데이트 필요',
                '최신 버전으로 업데이트해주세요.',
                [
                  { text: '취소', style: 'cancel' },
                  {
                    text: '업데이트하기',
                    onPress: () => Linking.openURL('itms-apps://apps.apple.com/sa/app/allts/id6746038222'),
                  },
                ],
                { cancelable: false }
              );
        }
    } catch (err) {
        console.error('Daily task error:', err);
    }
    };

    runStartTask();
}, []);
  return  (
    <LoadingScreen
    color="blue"
    />
  );
};
export default React.memo(StartScreen);
StartScreen.whyDidYouRender = true;
