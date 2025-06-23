import { StateDto } from './config';
import { matchDto } from './main.dto';

export interface leagueDto {
    leagueId: number,
    leagueName: string,
    leagueLogo: string,
    sportId: number,
    sportName: string,
    countryId: number,
    countryName: string,
    isSelected: boolean
}

export interface teamDto {
    teamId: number,
    teamName: string,
    teamInit: string,
    teamLogo: string,
    rank: string,
    win: number,
    rose: number,
    draw: number,
    point: number,
    section: string,
}

export interface getLeagueResDto {
    league: leagueDto | null,
    teamList: teamDto[] | null,
    matchList: matchDto[] | null
}

export interface getLeagueReqQueryDto {
    leagueId: number
}

export type getLeagueReqDto = StateDto<getLeagueReqQueryDto>



