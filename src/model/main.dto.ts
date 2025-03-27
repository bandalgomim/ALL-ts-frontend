import { StateDto } from './config';

export interface match {
    matchId: number,
    matchDate: string,
    homeTeamId: number,
    awayTeamId: number,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamInit: string,
    awayTeamInit: string,
    hometeamLogo: string,
    awayteamLogo: string,
    homeTeamScore: number,
    awayTeamScore: number,
    matchState: string,
    isMatchSelected: boolean
}

export interface team {
    teamId: number,
    teamName: string,
    teamLogo: string,
    index: number
}
export interface league {
    leagueId: number,
    leagueName: string,
    leagueLogo: string,
    index: number
}

export interface getMainResDto {
    matchList: match[] | null,
    teamAndLeagueList: (team | league)[] | null,
}

export interface getMainReqQueryDto {}

export type getMainReqDto = StateDto<null>
