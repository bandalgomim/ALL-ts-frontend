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
    teamInit: string,
    teamLogo: string
}

export interface getLeagueResDto {
    league: league | null,
    teamList: team[] | null,
    matchList: match[] | null
}

export interface getLeagueReqQueryDto {
    leagueId: number
}

export type getLeagueReqDto = StateDto<getLeagueReqQueryDto>



