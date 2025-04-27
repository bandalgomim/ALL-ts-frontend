import notifee, { AndroidImportance, AuthorizationStatus, EventType } from '@notifee/react-native';
import { Linking, Platform } from 'react-native';

export async function initializeNotifications() {
  try {
    console.log('🔔 알림 초기화 시작');
    // 1. 사용자 권한 요청 (iOS + Android 13 이상)
    const settings = await notifee.requestPermission({
      android: {
        alarm: true, // 정확한 알람 권한 요청
      }
    });

    console.log('알림 권한 상태:', settings);

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('🔔 알림 권한 허용됨');

      // 2. Android 전용: 알림 채널 만들기
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
    } else {
      console.log('🚫 알림 권한 거부됨');
    }
  } catch (error) {
    console.error('알림 초기화 실패:', error);
  }
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('[Background] 이벤트 수신:', type, detail);
    if (type === EventType.DELIVERED) {
      console.log('[Background] 알림 수신됨:', detail.notification);
    }else if (type === EventType.PRESS) {
      console.log('[Background] 알림 클릭됨:', detail.notification?.data);
      const { screen, params } = detail.notification?.data || {};
      if (screen && params) {
        // 딥링크 형태로 화면 이동
        const deepLink = `myapp://${screen}/${params}`;
        console.log('딥링크 실행:', deepLink);
        Linking.openURL(deepLink);
      }
    }
    return Promise.resolve();
  });
  notifee.onForegroundEvent(({ type, detail }) => {
      console.log('[Foreground] 이벤트 수신:', type, detail);
      if (type === EventType.DELIVERED) {
        console.log('[Foreground] 알림 수신됨:', detail.notification);
      } else if (type === EventType.PRESS) {
        console.log('[Foreground] 알림 클릭됨:', detail.notification?.data);
        const { screen, params } = detail.notification?.data || {};
        if (screen && params) {
          // 딥링크 형태로 화면 이동
          const deepLink = `myapp://${screen}/${params}`;
          console.log('딥링크 실행:', deepLink);
          Linking.openURL(deepLink);
        }
      }
    });
}
