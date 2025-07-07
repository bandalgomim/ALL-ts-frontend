import { StateDto } from './config';

export interface matchDto {
    matchId: number,
    matchDate: string,
    matchTime: string,
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
    teamInit: string,
    teamLogo: string,
    index: number
}
export interface leagueDto {
    leagueId: number,
    leagueName: string,
    leagueInit: string,
    leagueLogo: string,
    index: number
}

export type matchListDto = Record<string, matchDto[]>;

export interface getmainResDto {
    matchList: matchListDto | null,
    teamAndLeagueList: (teamDto | leagueDto)[] | null,
}

export interface getMainResQueryDto {}

export type patchMainReqBodyDto = Omit<teamDto, 'teamName' | 'teamLogo'> | Omit<leagueDto, 'leagueName' | 'leagueLogo'>;

export type getMainReqDto = StateDto<null>
export type patchMainReqDto = StateDto<patchMainReqBodyDto[]>