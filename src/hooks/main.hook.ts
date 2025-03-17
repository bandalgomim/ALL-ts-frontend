import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { getMainReqQueryDto } from '../model/main.dto';

export const useMain = (method: string, data: getMainReqQueryDto | null = null) => {
    
    const {main, setMain} = useContext(ApiContext);
    useEffect(() => {
        const url = 'http://10.0.2.2:3000/main';
        const fetchMyPage = async () => {
            setMain({ type: 'LOADING' });
            console.log('useMain before: ', method=== 'GET');
            if (method === 'GET'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as getMainReqQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                console.log('after query: ', query);
                const getUrl = url + '?' + query.toString();
                console.log('after query: ', getUrl);
                await commonPostHook(method, getUrl, null, setMain);
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [method, data]);
      console.log('useMain after: ', main);
};