import React, { useContext, useEffect } from 'react';
import StackNavigator from './src/navigation/stackNavigater';
import { initializeNotifications } from './src/notification/initializeNotifications';
import { AuthContext } from './src/context/auth.context';
import { hookRefreshToken } from './src/hooks/IAM.hook';
import { getMessaging, onMessage } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { displayNotification } from './src/notification/displayNotification';
import useDailyTask from './src/hooks/daily.hook';


function App(): React.JSX.Element {
  useDailyTask();
  useEffect(() => {
    // 알림 초기화
    initializeNotifications();
    const unsubscribeOnMessage = onMessage(getMessaging(getApp()), async remoteMessage => {
      await displayNotification(remoteMessage);
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, []);
  return (
    <>
      <StackNavigator />
    </>
  );
}

export default App;
