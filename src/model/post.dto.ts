

export interface postPostDto {
    type: 'blog' | 'comunity' | 'mvp' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9',
    matchId: number,
    playerId: number | null,
    title: string,
    body: string,
    thumbnailUrl: string
}

export interface getPostDto {
    post: {
        postId: number,
        type: 'blog' | 'comunity' | 'mvp' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9',
        title: string,
        body: string,
        thumbnailUrl: string,
        like: number,
        views: number,
        commentCount: number,
        createdAt: string,
        updatedAt: string,
        postIsMine: boolean,
        isLiked: boolean
    } | null,
    user: {
        userId: string,
        userEmail: string,
        userName: string,
        userIconUrl: string
    } | null,
    match: {
        matchId: number,
        matchDate: string,
        homeTeamScore: number,
        awayTeamScore: number,
        homeTeamIconFlag: string,
        awayTeamIconFlag: string
    } | null,
    comment: {
        commentId: string,
        commentUserId: string,
        commentUserName: string,
        commentUserIconUrl: string,
        commentBody: string,
        commentCreatedAt: string,
        commentIsMine: boolean
    }[] | null,
    reply: {
        replyId: string,
        replyUserId: string,
        replyUserName: string,
        replyUserIconUrl: string,
        replyBody: string,
        replyCreatedAt: string,
        commentedId: string,
        replyIsMine: boolean
    }[] | null
}

export interface getPostListObjDto {
    postId: number,
    type: 'blog' | 'comunity' | 'mvp' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9',
    title: string,
    thumbnailUrl: string,
    like: number,
    views: number,
    commentCount: number,
    createdAt: string,
    userName: string,
    userIconUrl: string
}

export type getPostListDto = getPostListObjDto[];

export interface patchPostDto {
    postId: number,
    matchId: number,
    playerId: number | null,
    title: string,
    body: string,
    thumbnailUrl: string
}

export interface contextPostListDto {
    blog: getPostListDto | null,
    mvp: getPostListDto | null,
    community: getPostListDto | null,
    myTeamCommunity: getPostListDto | null
}

export interface getPostReq {
    postId: number | null,
}
export interface getPostListReq {
    type: string | null,
    date: string | null,
}

export interface myPostStateDto {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    data: getPostListReq
}

export type postDto = getPostListDto | getPostDto | contextPostListDto | getPostReq | postPostDto | getPostListReq | null
