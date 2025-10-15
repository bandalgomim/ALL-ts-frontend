import { StateDto } from './config';
import { matchDto, matchListDto } from './main.dto';

export interface leagueDto {
    leagueId: number,
    leagueName: string,
    leagueInit: string,
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
    lose: number,
    draw: number,
    point: number,
    section: string,
    sectionIdx: number
}

export interface getLeagueResDto {
    league: leagueDto,
    teamList: teamDto[],
    matchList: matchListDto
}

export interface getLeagueReqQueryDto {
    leagueId: number
}

export type getLeagueReqDto = StateDto<getLeagueReqQueryDto>



