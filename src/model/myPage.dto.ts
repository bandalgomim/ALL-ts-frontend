
export interface getMyPageReq {
    date: string | null,
    year: string | null,
    month: string | null
}

export interface getMyPageRes {
    user: {
        userEmail: string,
        userName: string,
        userIconUrl: string,
        userBackgroundUrl: string,
        userTeamId: number
    } | null,
    team: {
        teamName: string,
        teamIconRound: string
    } | null,
    match: {
        matchId: number,
        matchDate: string,
        state: string,
        homeTeamScore: number,
        awayTeamScore: number,
        homeTeamIconFlag: string,
        awayTeamIconFlag: string
    } | null,
    postDate: string[] | null
}

export interface patchMyPageReq {
    iconUrl: string,
    backgroundUrl: string,
    teamId: number
}
export interface myPageStateDto {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    data: 
}

export type myPageDto = getMyPageReq | getMyPageRes | patchMyPageReq | null;
