import { useContext, useEffect } from 'react';
import { commonPostHook } from './common.hook';
import { getLeagueReqQueryDto } from '../model/league.dto';
import { AuthContext } from '../context/auth.context';
import { LeagueContext } from '../context/league.context';

export const useLeague = (method: string, data: getLeagueReqQueryDto | null = null) => {
    const {setLeagueRes } = useContext(LeagueContext);
    const {setLogin } = useContext(AuthContext);
    useEffect(() => {
        if (data === null || data.leagueId === null) {
            return;
        }
        const url = 'https://all-ts-backend-production.up.railway.app/league';
        const fetchMyPage = async () => {
            setLeagueRes({ type: 'LOADING' });
            if (method === 'GET'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as getLeagueReqQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setLeagueRes, setLogin );
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
};
