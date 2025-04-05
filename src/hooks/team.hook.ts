import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { getTeamReqQueryDto } from '../model/team.dto';

export const useTeam = (method: string, data: getTeamReqQueryDto | null = null) => {
    const {setTeamRes, setLogin } = useContext(ApiContext);
    useEffect(() => {
        if (data === null) {
            return;
        }
        const url = 'http://192.168.1.20:3000/team';
        const fetchMyPage = async () => {
            setTeamRes({ type: 'LOADING' });
            if (method === 'GET'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as getTeamReqQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setTeamRes, setLogin );
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
};
