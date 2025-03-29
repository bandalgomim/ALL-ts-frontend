import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { getMainResQueryDto } from '../model/main.dto';

export const useMain = (method: string, data: getMainResQueryDto | null = null) => {
    const {setMainRes} = useContext(ApiContext);
    useEffect(() => {
        const url = 'http://10.0.2.2:3000/main';
        const fetchMyPage = async () => {
            setMainRes({ type: 'LOADING' });
            if (method === 'GET'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as getMainResQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setMainRes);
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
};
