import notifee, { TimestampTrigger, TriggerType, AndroidImportance } from '@notifee/react-native';
import { matchDto, matchListDto } from '@model/main.dto';

export async function scheduleTodayMatches(matchList: matchListDto) {
  if (!matchList) return;

  // 오늘 날짜 기준 (자정 0시로 맞춤)
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
      const { matchId, matchDate, matchTime, homeTeamInit, awayTeamInit, homeTeamName, awayTeamName } = match;
      const [hour, minute] = matchTime.split(':').map(Number);

      const matchDateTime = new Date(year, month - 1, day, hour, minute);

      // 이미 지난 경기면 패스
      if (matchDateTime.getTime() < Date.now()) {
        continue;
      }

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: matchDateTime.getTime(),
        alarmManager: true,
      };

      await notifee.createTriggerNotification(
        {
          id: `${matchId}`, // 고유 ID
          title: '곧 시작하는 경기!',
          body: `${homeTeamInit} vs ${awayTeamInit}`,
          data: {
            screen: 'match',
            matchId: match.matchId.toString(),
          },
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
            },
          },
        },
        trigger
      );
    }
  }
}
