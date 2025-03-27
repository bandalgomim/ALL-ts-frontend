import { StateDto } from './config';

export interface matchDto {
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

export interface teamDto {
    teamId: number,
    teamName: string,
    teamLogo: string,
    index: number
}
export interface leagueDto {
    leagueId: number,
    leagueName: string,
    leagueLogo: string,
    index: number
}

export interface getMainResDto {
    matchList: matchDto[] | null,
    teamAndLeagueList: (teamDto | leagueDto)[] | null,
}

export interface getMainReqQueryDto {}

export type getMainReqDto = StateDto<null>
