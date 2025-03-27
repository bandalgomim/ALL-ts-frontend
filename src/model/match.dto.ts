import { StateDto } from "./config"

export interface platform {
    platformId: number | null,
    platformName: string | null,
    platformlogo: string | null,
    platformUrl: string | null
}

export interface getMatchResDto {
    matchId: number | null,
    matchDate: string | null,
    homeTeamId: number | null,
    awayTeamId: number | null,
    homeTeamName: string | null,
    awayTeamName: string | null,
    homeTeamInit: string | null,
    awayTeamInit: string | null,
    hometeamLogo: string | null,
    awayteamLogo: string | null,
    homeTeamScore: number | null,
    awayTeamScore: number | null,
    sportName: string | null,
    homeCountryName: string | null,
    awayCountryName: string | null,
    homeLeagueName: string | null,
    awayLeagueName: string | null,
    matchState: string | null,
    isMatchSelected: boolean | null,
    platform: platform[] | null
}

export interface getMatchReqQueryDto {
    matchId: number
}

export type getMatchReqDto = StateDto<getMatchReqQueryDto>
