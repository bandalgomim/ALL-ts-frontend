import { useContext, useEffect } from 'react';
import { getLoginReqDto, patchFcmTokenReqDto, postSignUpReqDto } from '../model/IAM.dto';
import axios from 'axios';
import { localData } from '../IAM/localData';
import { initialmainRes, initialteamRes, initialLeagueRes, initialmatchRes } from '../reducsers/apiReducer';
import { AuthContext } from '../context/auth.context';
import messaging from '@react-native-firebase/messaging';

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
    const fcmToken = await messaging().getToken();
    await hookFcmToken({'token': fcmToken});

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
        console.log("data", data)
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
          console.log('response', response);
          if (response.headers.authorization) {
            await localData.set('Authorization', response.headers.authorization);
            await localData.set('RefreshToken', response.headers.refreshtoken);
            console.log("test1")
            if (loginState) {
                loginState(true);
            }
          } else {
            console.log("test2")
            if (loginState) {
                loginState(true);
            }
          }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.includes('refresh token unmatched')) {
                console.log("test3")
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
