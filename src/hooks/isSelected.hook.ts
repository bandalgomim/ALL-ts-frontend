import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { patchIsSelected, patchIsTeamSelected } from '../model/isSelected.dto';

export const useIsSelected = (method: string, data: patchIsSelected | null = null) => {
    const { setMainRes, setLogin } = useContext(ApiContext);
    useEffect(() => {
        if (data === null) {
            return;
        }
        const url = 'http://192.168.1.20:3000/isSelected';
        const fetchIsSelected = async () => {
            setMainRes({ type: 'LOADING' });
            if (method === 'PATCH'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as patchIsTeamSelected).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setMainRes, setLogin);
            }
        };
        fetchIsSelected();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [method, data]);
};
