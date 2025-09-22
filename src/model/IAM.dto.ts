import { AppleRequestResponse } from "@invertase/react-native-apple-authentication"

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
    idToken: string | AppleRequestResponse
}
