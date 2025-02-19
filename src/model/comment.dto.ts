export interface postCommentDto {
    postId: number,
    body: string,
    isReply: null | number
}

export interface patchCommentDto {
    commentId: number,
    body: string
}

export interface deleteCommentDto {
    postId: number,
    commentId: number
}

export type commentDto = postCommentDto | patchCommentDto | deleteCommentDto | null
