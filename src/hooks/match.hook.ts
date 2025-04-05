import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { getMatchResQueryDto } from '../model/match.dto';

export const useMatch = (method: string, data: getMatchResQueryDto | null = null) => {
    const {setMatchRes, setLogin } = useContext(ApiContext);
    useEffect(() => {
        if (data === null) {
            return;
        }
        const url = 'http://192.168.1.20:3000/match';
        const fetchMyPage = async () => {
            setMatchRes({ type: 'LOADING' });
            if (method === 'GET'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as getMatchResQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setMatchRes, setLogin );
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
};
