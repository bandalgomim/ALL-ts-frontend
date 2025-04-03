import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { getMainResQueryDto } from '../model/main.dto';

export const useMain = (method: string, data: getMainResQueryDto | null = null) => {
    const {setMainRes, setLogin } = useContext(ApiContext);
    useEffect(() => {
        if (method !== 'GET' && data === null) {
            return;
        }
        const url = 'https://all-ts-backend-production.up.railway.app/main';
        const fetchMyPage = async () => {
            setMainRes({ type: 'LOADING' });
            const query = new URLSearchParams();
            if (method === 'GET'){
                if (data) {
                    Object.entries(data as unknown as getMainResQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setMainRes, setLogin );
            } else if (method === 'PATCH') {
                await commonPostHook(method, url, data, null, setLogin );
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, method === 'GET' ? [] : [data]);
};
