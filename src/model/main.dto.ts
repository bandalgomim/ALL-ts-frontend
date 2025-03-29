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

export interface getmainReqDto {
    matchList: matchDto[] | null,
    teamAndLeagueList: (teamDto | leagueDto)[] | null,
}

export interface getMainResQueryDto {}

export type getMainResDto = StateDto<null>
export type patchMainReqDto = Omit<teamDto, 'teamName' | 'teamLogo'> | Omit<leagueDto, 'leagueName' | 'leagueLogo'>;
