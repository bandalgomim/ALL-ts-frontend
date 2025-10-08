import { useEffect } from 'react';
import { hookSearchTag } from './searchTag.hook';
import { useSearchTagActions } from '../context/searchTag.context';
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import { hookFcmToken } from './IAM.hook';
import { getApp } from '@react-native-firebase/app';

const useDailyTask = () => {
  const { setSearchTagRes } = useSearchTagActions()
  useEffect(() => {
    const runDailyTask = async () => {
      try {
        const fcmToken = await getToken(getMessaging(getApp()));
        await hookFcmToken({'token': fcmToken});
        await hookSearchTag('GET', null, setSearchTagRes);
        
      } catch (err) {
        console.error('Daily task error:', err);
      }
    };

    runDailyTask();
  }, []);
};

export default useDailyTask;
