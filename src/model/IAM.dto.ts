export interface postSignUpReqDto {
    id: string,
    email: string,
    nickname: string,
    icon: string
}

export interface patchFcmTokenReqDto {
    token: string
}


export interface getLoginReqDto {
    id: string,
}
