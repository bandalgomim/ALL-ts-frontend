import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { getLeagueReqQueryDto } from '../model/league.dto';

export const useLeague = (method: string, data: getLeagueReqQueryDto | null = null) => {
    
    const {league, setLeague} = useContext(ApiContext);
    useEffect(() => {
        const url = 'http://10.0.2.2:3000/league';
        const fetchMyPage = async () => {
            setLeague({ type: 'LOADING' });
            console.log('useLeague before: ', method=== 'GET');
            if (method === 'GET'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as getLeagueReqQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                console.log('after query: ', query);
                const getUrl = url + '?' + query.toString();
                console.log('after query: ', getUrl);
                await commonPostHook(method, getUrl, null, setLeague);
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [method, data]);
      console.log('useLeague after: ', league);
};