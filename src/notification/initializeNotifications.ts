import notifee, { AndroidImportance, AuthorizationStatus, EventType } from '@notifee/react-native';
import { Linking, Platform } from 'react-native';
import { getInitialNotification, getMessaging, onNotificationOpenedApp } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

export async function initializeNotifications() {
  try {

    // iOS와 Android 모두를 위한 권한 요청
    const settings = await notifee.requestPermission({
      android: {
        alarm: true, // Android: 정확한 알람 권한 요청
      },
      ios: {
        // iOS: 필요한 모든 알림 권한 요청
        alert: true,       // 알림 표시
        badge: true,       // 앱 아이콘 배지
        sound: true,       // 알림음
        criticalAlert: true, // 중요 알림
        provisional: true,   // 임시 알림 허용
      },
    });
    console.log('알림 권한 상태:', settings);
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('🔔 알림 권한 허용됨');

      // Android 전용 채널 만들기
      if (Platform.OS === 'android') {
        const channelId = await notifee.createChannel({
          id: 'default',
          name: '기본 알림 채널',
          lights: true,
          vibration: true,
          sound: 'default',
          importance: AndroidImportance.HIGH,
        });
        console.log('✅ Android 알림 채널 생성 완료:', channelId);
      }
      // iOS 전용 설정
      else if (Platform.OS === 'ios') {
        // iOS 전용 카테고리 등록 (선택사항)
        await notifee.setNotificationCategories([
          {
            id: 'match',
            actions: [
              {
                id: 'view',
                title: '경기 보기',
              },
            ],
          },
        ]);
        console.log('✅ iOS 알림 카테고리 설정 완료');
      }
    }
  } catch (error) {
    console.error('알림 초기화 실패:', error);
  }
  // 이벤트 핸들러 등록 (기존 코드 유지)
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.DELIVERED) {
      console.log('[Background] 알림 수신됨:', detail.notification);
    } else if (type === EventType.PRESS) {
      console.log('[Background] 알림 클릭됨:', detail.notification?.data);
      const { screen, matchId } = detail.notification?.data || {};
      if (screen && matchId) {
        const deepLink = `myapp://${screen}/${matchId}`;
        console.log('딥링크 실행:', deepLink);
        Linking.openURL(deepLink); // iOS에서는 Linking.openURL 대신 notifee.openUrl 사용
      }
    }
    return Promise.resolve();
  });
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.DELIVERED) {
      console.log('[Foreground] 알림 수신됨:', detail.notification);
    } else if (type === EventType.PRESS) {
      console.log('[Foreground] 알림 클릭됨:', detail.notification?.data);
      console.log('딥링크 실행:', detail.notification?.data);
      const { screen, matchId } = detail.notification?.data || {};
      if (screen && matchId) {
        const deepLink = `myapp://${screen}/${matchId}`;
        console.log('딥링크 실행:', deepLink);
        Linking.openURL(deepLink);
      }
    }
  });
  onNotificationOpenedApp(getMessaging(getApp()), remoteMessage => {
    const { screen, matchId } = remoteMessage.data || {};
    const deepLink = `myapp://${screen}/${matchId}`;
    console.log('딥링크 실행:', deepLink);
    Linking.openURL(deepLink);
  });

  getInitialNotification(getMessaging(getApp())).then(remoteMessage => {
    if (remoteMessage) {
      const { screen, matchId } = remoteMessage.data || {};
      const deepLink = `myapp://${screen}/${matchId}`;
      console.log('딥링크 실행:', deepLink);
      Linking.openURL(deepLink);
    }
  });
}
