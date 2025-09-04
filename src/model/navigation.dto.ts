export type TeamPageParamList = {
    TeamScreen: { teamId: number }; // MyPostScreen에 전달될 파라미터 타입 정의
  };

export type LeaguePageParamList = {
  LeagueScreen: { leagueId: number }; // MyPostScreen에 전달될 파라미터 타입 정의
};

export type MatchPageParamList = {
  MatchScreen: { matchId: string }; // MyPostScreen에 전달될 파라미터 타입 정의
};

export type MainPageParamList = {
  MainScreen: object | undefined; // MyPostScreen에 전달될 파라미터 타입 정의
};

export type IAMPageParamList = {
  IAMScreen: object | undefined; // MyPostScreen에 전달될 파라미터 타입 정의
};
