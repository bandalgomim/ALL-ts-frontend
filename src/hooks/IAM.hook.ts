import { useContext, useEffect } from 'react';
import { getLoginReqDto, postSignUpReqDto } from '../model/IAM.dto';
import axios from 'axios';
import { localData } from '../IAM/localData';
import { initialmainRes, initialteamRes, initialLeagueRes, initialmatchRes } from '../reducsers/apiReducer';
import { AuthContext } from '../context/auth.context';
import { MainContext } from '../context/main.context';
import { TeamContext } from '../context/team.context';
import { LeagueContext } from '../context/league.context';
import { MatchContext } from '../context/match.context';

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

export const useLogIn = (data: getLoginReqDto) => {
    const {setMainRes} = useContext(MainContext);
    const {setTeamRes} = useContext(TeamContext);
    const {setLeagueRes} = useContext(LeagueContext);
    const {setMatchRes} = useContext(MatchContext);
    const {setLogin} = useContext(AuthContext);
    useEffect(() => {
        if (data.id === null || data.id === "") {
            return;
        }
        setMainRes(initialmainRes);
        setTeamRes(initialteamRes);
        setLeagueRes(initialLeagueRes);
        setMatchRes(initialmatchRes);
        const url = 'https://all-ts-backend-production.up.railway.app/auth/IAM/loginTest';
        const fetchMyPage = async () => {
            await commonIAMHook('post', url, data, setLogin);
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data]);
};
export const useRefreshToken = () => {
    const {setLogin} = useContext(AuthContext);
    useEffect(() => {
        const url = 'https://all-ts-backend-production.up.railway.app/auth/IAM/refreshToken';
        const fetchMyPage = async () => {
            await commonIAMHook('GET', url, null, setLogin);
        };
        fetchMyPage();
      }, []);
};


export const commonIAMHook = async (
    method: string,
    url: string,
    data: Object | null = null,
    loginState: Function) => {
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
            loginState(true);
          } else {
            loginState(false);
          }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.includes('refresh token unmatched')) {
                loginState(false);
            }
        } else {
            console.log('Error:', error);
        }
    }
};
