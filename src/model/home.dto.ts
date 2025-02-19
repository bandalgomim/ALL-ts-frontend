import { getPostListDto } from './post.dto';

export interface todayMvpDto {
    name: string,
    profile: string,
    count: number,
    teamIcon: string
}

export type todayMvpListDto = todayMvpDto[];

export interface contextHomeDto {
    mvp: todayMvpListDto | null,
    blog: getPostListDto | null
}

export interface getHomeDto {
    type: string | null
}

export interface homeStateDto {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    data: 
}

export type homeDto = contextHomeDto | getHomeDto | null;
