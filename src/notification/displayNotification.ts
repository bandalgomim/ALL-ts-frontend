import notifee from '@notifee/react-native';

export const displayNotification = async (remoteMessage: any) => {
    const { title, body} = remoteMessage.notification;
    const { matchId, screen } = remoteMessage.data;
    await notifee.displayNotification({
      title: title || '알림',
      body: body || '새로운 알림이 있습니다.',
      data: {
        screen: screen || 'home',
        matchId: matchId || '0',
      },
      android: {
        channelId: 'default', // 채널 ID 설정
      },
    });
  };
