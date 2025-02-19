import { StateDto } from './config'
import { match } from './main.dto'

export interface team {
    teamId: number,
    teamName: string,
    teamLogo: string,
    leagueId: number,
    leagueName: string,
    sportId: number,
    sportName: string,
    countryId: number,
    countryName: string,
    isTeamSelected: boolean
}

export interface getTeamResDto {
    team: team | null,
    matchList: match[] | null
}

export interface getTeamReqQueryDto {
    teamId: number
}

export type getTeamReqDto = StateDto<getTeamReqQueryDto>