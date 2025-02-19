import { StateDto } from "./config"

export interface match {
    matchId: number,
    matchDate: string,
    homeTeamId: number,
    awayTeamId: number,
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
    isTeamSelected: boolean
}

export interface getMainResDto {
    matchList: match[] | null,
    teamList: team[] | null
}

export type getMainReqDto = StateDto<null>