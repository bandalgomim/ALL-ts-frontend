
export interface platform {
    platformId: number | null,
    platformName: string | null,
    platformLeagueUrl: string | null,
    platformMatchUrl: string | null,
    platfromMatchUrlType: string | null
}

export interface getMatchResDto {
    matchId: string | null,
    matchDate: string | null,
    matchTime: string | null,
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

export interface getMatchResQueryDto {
    matchId: string
}
