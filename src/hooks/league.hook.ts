import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { getLeagueReqQueryDto } from '../model/league.dto';

export const useLeague = (method: string, data: getLeagueReqQueryDto | null = null) => {
    const {setLeagueReq} = useContext(ApiContext);
    useEffect(() => {
        if (data === null) {
            return;
        }
        const url = 'http://10.0.2.2:3000/league';
        const fetchMyPage = async () => {
            setLeagueReq({ type: 'LOADING' });
            if (method === 'GET'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as getLeagueReqQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setLeagueReq);
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [method, data]);
};
