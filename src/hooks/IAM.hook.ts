import { useContext, useEffect } from 'react';
import { getLoginReqDto, patchFcmTokenReqDto, postSignUpReqDto } from '../model/IAM.dto';
import axios from 'axios';
import { localData } from '../IAM/localData';
import { initialmainRes, initialteamRes, initialLeagueRes, initialmatchRes } from '../reducsers/apiReducer';
import { AuthContext } from '../context/auth.context';
import { getMessaging, getToken, registerDeviceForRemoteMessages } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

export const useSignUp = (data: postSignUpReqDto) => {
    const {setLogin} = useContext(AuthContext);
    useEffect(() => {
        if (data === null) {
            return;
        }
        const url = 'https://all-ts-backend-production.up.railway.app/auth/IAM/signUpTest';
        const fetchMyPage = async () => {
            await commonIAMHook('POST', url, data, setLogin);
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
};

export const hookLogIn = async (
    data: getLoginReqDto,
    setMainRes: (res: any) => void,
    setTeamRes: (res: any) => void,
    setLeagueRes: (res: any) => void,
    setMatchRes: (res: any) => void,
    setLogin: (login: any) => void
) => {
    // 입력값 검증
    if (data.id === null || data.id === "") {return;}
    // 모든 상태 초기화
    setMainRes(initialmainRes);
    setTeamRes(initialteamRes);
    setLeagueRes(initialLeagueRes);
    setMatchRes(initialmatchRes);
    // API 호출
    const url = 'https://all-ts-backend-production.up.railway.app/auth/IAM/loginTest';
    await commonIAMHook('post', url, data, setLogin);

    try {
        // iOS에서 FCM 등록
        const fcmToken = await getToken(getMessaging(getApp()));
        console.log('fcmToken', fcmToken);
        await hookFcmToken({'token': fcmToken});
    } catch (e) {
        console.error('FCM 토큰 에러:', e);
    }
};

export const hookRefreshToken = async (
    setLogin: (login: any) => void
) => {
    try {
        const url = 'https://all-ts-backend-production.up.railway.app/auth/IAM/refreshToken';
        await commonIAMHook('GET', url, null, setLogin);
    } catch (error) {
        console.error('RefreshToken 요청 실패:', error);
        setLogin(false);
    }
};

export const hookFcmToken = async (data:patchFcmTokenReqDto)=> {
    console.log("hookFcmToken", data)
    try {
        const url = 'https://all-ts-backend-production.up.railway.app/fcmToken';
        await commonIAMHook('PATCH', url, data, null);
    } catch (error) {
        console.error('hookFcmToken 요청 실패:', error);
    }
};


export const commonIAMHook = async (
    method: string,
    url: string,
    data: Object | null = null,
    loginState: Function | null) => {
    try {
        const authToken = await localData.get('Authorization');
        const refreshToken = await localData.get('RefreshToken');
        if (refreshToken === null && data === null) {
            if (loginState) {
                loginState(false);
            }
        }
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
            if (loginState) {
                loginState(true);
            }
          } else {
            if (loginState) {
                loginState(true);
            }
          }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.includes('refresh token unmatched')) {
                await localData.delete('Authorization');
                await localData.delete('RefreshToken');
                if (loginState) {
                    loginState(true);
                }
            }
        } else {
            console.log('Error:', error);
        }
    }
};
