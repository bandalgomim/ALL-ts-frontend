import { StateDto } from './config';
import { matchListDto } from './main.dto';

export interface teamDto {
    teamId: number,
    teamName: string,
    teamInit: string,
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
    team: teamDto,
    matchList: matchListDto
}

export interface getTeamReqQueryDto {
    teamId: number,
    key?: string
}

export type getTeamReqDto = StateDto<getTeamReqQueryDto>
