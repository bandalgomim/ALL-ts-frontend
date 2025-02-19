import { StateDto } from "./config"

export interface platform {
    platformId: number | null,
    platformName: string | null,
    platformlogo: string | null,
    platformUrl: string | null
}

export interface getMatchReqDto {
    matchId: number | null,
    matchDate: string | null,
    homeTeamId: number | null,
    awayTeamId: number | null,
    hometeamLogo: string | null,
    awayteamLogo: string | null,
    homeTeamScore: number | null,
    awayTeamScore: number | null,
    matchState: string | null,
    isMatchSelected: boolean | null,
    platform: platform[] | null
}

export interface getMatchReqQueryDto {
    matchId: number
}

export type getTeamReqDto = StateDto<getMatchReqQueryDto>