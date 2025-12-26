import { matchDto } from '@model/main.dto';

const formatMatchDate = (matchDate: string): string => {
  return matchDate.replace(' ', 'T')
};

export const binarySearchClosestMatch = (matchList: matchDto[]) => {
  const currentDate = new Date().getTime() + (9 * 60 * 60 * 1000); // 현재 UTC 기준 밀리초
  let low = 0;
  let high = matchList.length - 1;
  let closestIndex = -1;
  let closestDiff = Infinity;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const matchTime = new Date(formatMatchDate(matchList[mid].matchDate)).getTime();
    const timeDiff = Math.abs(matchTime - currentDate);

    if (timeDiff < closestDiff) {
      closestDiff = timeDiff;
      closestIndex = mid;
    }

    // 내림차순 정렬 기준으로 탐색
    if (matchTime > currentDate) {
      low = mid + 1; // 현재 시간보다 경기 시간이 더 미래라면, 오른쪽(더 작은 값)으로 이동
    } else {
      high = mid - 1; // 현재 시간보다 경기 시간이 더 과거라면, 왼쪽(더 큰 값)으로 이동
    }
  }
  return closestIndex;
};
