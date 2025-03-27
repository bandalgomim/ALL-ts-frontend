import { match } from "./main.dto";

export type TeamPageParamList = {
    TeamScreen: { teamId: number }; // MyPostScreen에 전달될 파라미터 타입 정의
  };

export type LeaguePageParamList = {
  LeagueScreen: { leagueId: number }; // MyPostScreen에 전달될 파라미터 타입 정의
};

export type MatchPageParamList = {
  MatchScreen: { matchId: matchId }; // MyPostScreen에 전달될 파라미터 타입 정의
};