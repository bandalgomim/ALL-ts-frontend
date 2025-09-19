import { getLoginReqDto, patchFcmTokenReqDto, postSignUpReqDto } from '../model/IAM.dto';
import axios from 'axios';
import { localData } from '../IAM/localData';
import { initialmainRes, initialteamRes, initialLeagueRes, initialmatchRes } from '../reducsers/apiReducer';
import { getMessaging, getToken, registerDeviceForRemoteMessages } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

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
    const url = `https://170a3ecb9abb.ngrok-free.app/auth/IAM/${type}/${idp}`;
    const res = await commonIAMHook('post', url, data);
    try {
        // iOS에서 FCM 등록
        const fcmToken = await getToken(getMessaging(getApp()));
        await hookFcmToken({'token': fcmToken});
        return res;
    } catch (e) {
        console.error('FCM 토큰 에러:', e);
    }
};

export const hookRefreshToken = async () => {
    try {
        const url = 'https://all-ts-backend-production.up.railway.app/auth/IAM/refreshToken';
        await commonIAMHook('GET', url, null);
    } catch (error) {
        console.error('RefreshToken 요청 실패:', error);
    }
};

export const hookFcmToken = async (data:patchFcmTokenReqDto)=> {
    console.log("hookFcmToken", data)
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
    console.log('MainScreen mounted with login:', isLogin);
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
            await localData.set('icon', response.data.icon);
          }
          if (response.data && response.data.success) {
            console.log('Response Data:', response.data.icon);
            return response.data.success;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.includes('refresh token unmatched')) {
                await localData.delete('Authorization');
                await localData.delete('RefreshToken');
            }
        } else {
            console.log('Error:', error);
        }
    }
};
