import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/context';
import { commonPostHook } from './common.hook';
import { patchIsLeagueSelected, patchIsTeamSelected } from '../model/isSelected.dto';

export const useIsTeamSelected = (method: string, data: patchIsTeamSelected | null = null) => {
    const { isTeamSelected, setIsTeamSelected, isLeagueSelected, setIsLeagueSelected } = useContext(ApiContext);
    useEffect(() => {
        const url = 'http://10.0.2.2:3000/isSelected';
        const fetchIsTeamSelected = async () => {
            setIsTeamSelected({ type: 'LOADING' });
            if (method === 'PATCH'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as patchIsTeamSelected).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setIsTeamSelected);
            }
        };
        fetchIsTeamSelected();
      }, [method, data]);
};

export const useIsLeagueSelected = (method: string, data: patchIsLeagueSelected | null = null) => {
    const { isLeagueSelected, setIsLeagueSelected } = useContext(ApiContext);
    useEffect(() => {
        const url = 'http://10.0.2.2:3000/isSelected';
        const fetchIsLeagueSelected = async () => {
            setIsLeagueSelected({ type: 'LOADING' });
            if (method === 'PATCH'){
                const query = new URLSearchParams();
                if (data) {
                    Object.entries(data as unknown as patchIsLeagueSelected).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
                }
                const getUrl = url + '?' + query.toString();
                await commonPostHook(method, getUrl, null, setIsLeagueSelected);
            }
        };
        fetchIsLeagueSelected();
      }, [method, data]);
};
