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

export interface getTeamReqDto {
    team: teamDto | null,
    matchList: matchDto[] | null
}

export interface getTeamResQueryDto {
    teamId: number
}

export type getTeamResDto = StateDto<getTeamResQueryDto>
