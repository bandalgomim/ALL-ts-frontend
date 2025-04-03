import { StateDto } from './config';
import { matchDto } from './main.dto';

export interface teamDto {
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
    team: teamDto | null,
    matchList: matchDto[] | null
}

export interface getTeamReqQueryDto {
    teamId: number
}

export type getTeamReqDto = StateDto<getTeamReqQueryDto>
