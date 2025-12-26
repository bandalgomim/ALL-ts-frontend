import { getLoginReqDto, patchFcmTokenReqDto, postSignUpReqDto } from '@model/IAM.dto';
import axios from 'axios';
import { localData } from '@IAM/localData';
import { initialmainRes, initialteamRes, initialLeagueRes, initialmatchRes } from '@reducers/apiReducer';
import { getMessaging, getToken, registerDeviceForRemoteMessages } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { getVersion } from 'react-native-device-info';
import { getDeviceVersion } from '@utils/deviceVersion';

export const hookAuth = async (
    data: getLoginReqDto,
    type: 'login' | 'signUp',
    idp: 'google' | 'apple',
    setMainRes: (res: any) => void,
    setTeamRes: (res: any) => void,
    setLeagueRes: (res: any) => void,
    setMatchRes: (res: any) => void
) => {
    // 입력값 검증
    if (data.idToken === null || data.idToken === "") {return;}
    // 모든 상태 초기화
    setMainRes(initialmainRes);
    setTeamRes(initialteamRes);
    setLeagueRes(initialLeagueRes);
    setMatchRes(initialmatchRes);
    // API 호출
    const url = `https://all-ts-backend-production.up.railway.app/auth/IAM/${type}/${idp}`;
    const res = await commonIAMHook('post', url, data);
    try {
        if (res === true) {
            const fcmToken = await getToken(getMessaging(getApp()));
            await hookFcmToken({'token': fcmToken});
        }
        return res;
    } catch (e) {
        console.error('FCM 토큰 에러:', e);
    }
};
export const hookDeleteAccount = async (
    setMainRes: (res: any) => void,
    setTeamRes: (res: any) => void,
    setLeagueRes: (res: any) => void,
    setMatchRes: (res: any) => void
) => {
    setMainRes(initialmainRes);
    setTeamRes(initialteamRes);
    setLeagueRes(initialLeagueRes);
    setMatchRes(initialmatchRes);
    const url = 'https://all-ts-backend-production.up.railway.app/auth/IAM/delete';
    const res = await commonIAMHook('DELETE', url, null);
    try {
        await localData.delete('RefreshToken');
        await localData.delete('Authorization');
        return res;
    } catch (error) {
        console.error('DeleteAccount 요청 실패:', error);
    }
}

export const hookRefreshToken = async () => {
    try {
        const url = 'https://all-ts-backend-production.up.railway.app/auth/IAM/refreshToken';
        await commonIAMHook('GET', url, null);
    } catch (error) {
        console.error('RefreshToken 요청 실패:', error);
    }
};

export const hookVersionCheck = async() => {
    try {
        const url = 'https://all-ts-backend-production.up.railway.app/versionCheck'
        const ver = await getDeviceVersion()
        console.log(ver)
        const response = await axios({
            method: 'POST',
            url: url,  // 올바른 URL 설정
            data: ver ,  // POST, PUT, DELETE일 경우 payload
        });
        return response.data.result

    } catch (error) {
        console.error('hookVersionCheck 요청 실패:', error);
    }
}
 
export const hookFcmToken = async (data:patchFcmTokenReqDto)=> {
    try {
        const url = 'https://all-ts-backend-production.up.railway.app/fcmToken';
        await commonIAMHook('PATCH', url, data);
    } catch (error) {
        console.error('hookFcmToken 요청 실패:', error);
    }
};


export const hookIsLogin = async (navigation: () => void) => {
    const checkRefreshToken = async () => {
    return Boolean(await localData.get('RefreshToken'));
    };
    const isLogin = await checkRefreshToken();
    if (!isLogin) { navigation() }
};

export const commonIAMHook = async (
    method: string,
    url: string,
    data: Object | null = null) => {
    try {
        const authToken = await localData.get('Authorization');
        const refreshToken = await localData.get('RefreshToken');
        const response = await axios({
            method: method,
            url: url,  // 올바른 URL 설정
            data: data ? data : {},  // POST, PUT, DELETE일 경우 payload
            headers: {
                'Authorization': authToken,
                'RefreshToken': refreshToken,
            },
        });
        if (response.headers.authorization) {
            await localData.set('Authorization', response.headers.authorization);
            await localData.set('RefreshToken', response.headers.refreshtoken);
            if (response.data.icon) {
                await localData.set('icon', response.data.icon);
            }
        }
        if (response.data) {
            return response.data.success;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.includes('refresh token unmatched')) {
                await localData.delete('Authorization');
                await localData.delete('RefreshToken');
                if (await localData.get('icon')) {
                    await localData.delete('icon');
                }
            } else {
                console.error('Axios error:', error.response);
            }
        } else {
            console.log('Error:', error);
        }
    }
};
