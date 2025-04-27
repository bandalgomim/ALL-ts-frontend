import notifee, { TimestampTrigger, TriggerType, AndroidImportance } from '@notifee/react-native';
import { matchDto, matchListDto } from '../model/main.dto';

export async function scheduleTodayMatches(matchList: matchListDto) {
  if (matchList === undefined) {
    return;
  }
  const today = new Date().toLocaleDateString('sv-SE'); // '2025-04-27' 형식으로 변환
  const todayMatches = matchList[today];
  if (!todayMatches || todayMatches.length === 0) {
    return;
  }
  await notifee.cancelAllNotifications(); // 싹 다 취소
  for (const match of todayMatches) {
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
    //console.log(`✅ 알림 예약: ${match.homeTeamName} vs ${match.awayTeamName} at ${matchTime}`);
  }
  //await scheduleTodayMatchesTest(todayMatches[0]);
}

async function scheduleTodayMatchesTest(match: matchDto) {
  const { matchId } = match;

  // matchDate: '2025-04-27', matchTime: '14:30' 이런 식으로 주어졌다고 가정
  const matchDateTime = Date.now() + 10000;
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,

    timestamp: matchDateTime,
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
  console.log(`✅ 알림 예약: ${match.homeTeamInit} vs ${match.awayTeamInit}`);
}