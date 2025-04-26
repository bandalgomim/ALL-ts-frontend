import { useContext, useEffect } from 'react';
import { commonPostHook } from './common.hook';
import { getLeagueReqQueryDto } from '../model/league.dto';
import { AuthContext } from '../context/auth.context';
import { LeagueContext } from '../context/league.context';

export const hookLeague = async (
    method: string,
    data: getLeagueReqQueryDto | null = null,
    setLeagueRes: (res: any) => void,
    setLogin: (login: any) => void
) => {
    setLeagueRes({ type: 'LOADING' });
    const url = 'https://all-ts-backend-production.up.railway.app/league';        
    const query = new URLSearchParams();
    Object.entries(data as unknown as getLeagueReqQueryDto).forEach(([key, value]) => {
        if (value !== null) {
            query.append(key, String(value));
        }
    });     
    const getUrl = url + '?' + query.toString();
    await commonPostHook(method, getUrl, null, setLeagueRes, setLogin);
    }

