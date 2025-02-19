import { StateDto } from "./config";
import { match } from "./main.dto";

export interface league {
    leagueId: number,
    leagueName: string,
    sportId: number,
    sportName: string,
    countryId: number,
    countryName: string
}

export interface team {
    teamId: number,
    teamName: string,
    teamLogo: string
}

export interface getLeagueResDto {
    league: league | null,
    team: team[] | null,
    match: match[] | null
}

export interface getleagueReqQueryDto {
    leagueId: number
}

export type getTeamReqDto = StateDto<getleagueReqQueryDto>



