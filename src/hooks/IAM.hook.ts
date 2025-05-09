import { useContext, useEffect } from 'react';
import { getLoginReqDto, postSignUpReqDto } from '../model/IAM.dto';
import axios from 'axios';
import { localData } from '../IAM/localData';
import { initialmainRes, initialteamRes, initialLeagueRes, initialmatchRes } from '../reducsers/apiReducer';
import { AuthContext } from '../context/auth.context';

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


export const commonIAMHook = async (
    method: string,
    url: string,
    data: Object | null = null,
    loginState: Function) => {
    try {
        const authToken = await localData.get('Authorization');
        const refreshToken = await localData.get('RefreshToken');
        console.log('authToken', authToken);
        console.log('refreshToken', refreshToken);
        console.log('data', data);
        console.log('method', method);
        console.log('url', url);
        if (refreshToken === null && data === null) {
            loginState(false);
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
            loginState(true);
          } else {
            console.log("test2")
            loginState(false);
          }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.includes('refresh token unmatched')) {
                console.log("test3")
                await localData.delete('Authorization');
                await localData.delete('RefreshToken');
                loginState(false);
            }
        } else {
            console.log('Error:', error);
        }
    }
};
