import notifee, { TimestampTrigger, TriggerType, AndroidImportance } from '@notifee/react-native';
import { matchDto, matchListDto } from '../model/main.dto';

export async function scheduleTodayMatches(matchList: matchListDto) {
  if (matchList === undefined) {
    return;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 7일 뒤 자정
  const weekLater = new Date(today);
  weekLater.setDate(today.getDate() + 7);

  await notifee.cancelAllNotifications(); // 기존 알림 싹 취소

  // matchList의 key는 'YYYY-MM-DD'
  for (const [dateKey, matches] of Object.entries(matchList)) {
    const [year, month, day] = dateKey.split('-').map(Number);
    const matchDay = new Date(year, month - 1, day);

    // 오늘~7일 사이만 필터링
    if (matchDay < today || matchDay >= weekLater) continue;
  for (const match of matches) {
    const { matchId, matchDate, matchTime } = match;

    // matchDate: '2025-04-27', matchTime: '14:30' 이런 식으로 주어졌다고 가정
    const [hour, minute] = matchTime.split(':').map(Number);
    const [year, month, day] = matchDate.split('-').map(Number);

    const matchDateTime = new Date(year, month - 1, day, hour, minute);
    if (matchDateTime.getTime() < Date.now()) {
        console.log(`⏭️ 이미 지난 경기: ${match.homeTeamName} vs ${match.awayTeamName}`);
        continue; // 지난 경기는 알림 안 잡음
      }
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,

      timestamp: matchDateTime.getTime(),
      alarmManager: true, // Android: 더 정확하게 알람 작동
    };
    await notifee.createTriggerNotification(
      {
        id: `${matchId}`, // 고유한 ID
        title: '곧 시작하는 경기!',
        body: `${match.homeTeamInit} vs ${match.awayTeamInit}`,
        data: {
          screen: 'match',
          matchId: match.matchId.toString() // 반드시 matchId로!
        },
        android: {
          channelId: 'default', // 미리 만들어둔 채널
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger
    );
  }
};

