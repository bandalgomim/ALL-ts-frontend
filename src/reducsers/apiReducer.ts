import { PostState, PostAction } from '../model/config';
import { getLeagueResDto } from '../model/league.dto';
import { getMainResDto } from '../model/main.dto';
import { getMatchReqDto } from '../model/match.dto';
import { getTeamResDto } from '../model/team.dto';


// 리듀서 함수
export const PostReducer = <T>(state:PostState<T>, action: PostAction<T>): PostState<T> => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      if (action.items && action.payload) {
        const updatedData = { ...state.data } as Record<string, unknown>; //기존 데이터가 객체 형식임을 확정
        action.items.forEach((item) => {
          const payload = action.payload as Record<string, unknown>; // 타입 단언
          updatedData[item] = payload[item]; // `item` 프로퍼티만 업데이트
        });
        return { ...state, loading: false, data: updatedData };
      } else {
        return { ...state, loading: false, data: action.payload };
      }
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const createInitial = <T>(data: T | null): PostState<T> => ({
  data,
  loading: false,
  error: null
});

// 각 데이터 구조에 맞게 초기값을 생성

export const initialmain = createInitial<getMainResDto>({
  matchList: null,
  teamList: null
});

export const initialteam = createInitial<getTeamResDto>({
  team: null,
  matchList: null
});

export const initialLeague = createInitial<getLeagueResDto>({
  league: null,
  team: null,
  match: null
});

export const initialmatch = createInitial<getMatchReqDto>({
  matchId: null,
  matchDate: null,
  homeTeamId: null,
  awayTeamId: null,
  hometeamLogo: null,
  awayteamLogo: null,
  homeTeamScore: null,
  awayTeamScore: null,
  matchState: null,
  isMatchSelected: null,
  platform: null
});
