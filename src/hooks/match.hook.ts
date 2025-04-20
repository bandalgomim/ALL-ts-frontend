import { useContext, useEffect } from 'react';
import { commonPostHook } from './common.hook';
import { getMatchResQueryDto } from '../model/match.dto';
import { MatchContext } from '../context/match.context';
import { AuthContext } from '../context/auth.context';

export const useMatch = (method: string, data: getMatchResQueryDto | null = null) => {
    const {setMatchRes } = useContext(MatchContext);
    const {setLogin } = useContext(AuthContext);
    useEffect(() => {
        if (data === null) {
            return;
        }
        const url = 'https://all-ts-backend-production.up.railway.app/match';
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
