import { StateDto } from "./config";
import { match } from "./main.dto";

export interface league {
    leagueId: number,
    leagueName: string,
    leagueLogo: string,
    sportId: number,
    sportName: string,
    countryId: number,
    countryName: string,
    isSelected: boolean
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



