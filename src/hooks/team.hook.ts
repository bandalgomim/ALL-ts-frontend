import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { getTeamReqQueryDto } from '../model/team.dto';

export const useTeam = (method: string, data: getTeamReqQueryDto | null = null) => {
    
    const {team, setTeam} = useContext(ApiContext);
    useEffect(() => {
        const url = 'http://10.0.2.2:3000/team';
        const fetchMyPage = async () => {
            setTeam({ type: 'LOADING' });
            console.log('useTeam before: ', method=== 'GET');
            if (method === 'GET'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as getTeamReqQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                console.log('after query: ', query);
                const getUrl = url + '?' + query.toString();
                console.log('after query: ', getUrl);
                await commonPostHook(method, getUrl, null, setTeam);
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [method, data]);
      console.log('useTeam after: ', team);
};