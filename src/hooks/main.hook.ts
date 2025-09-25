import { useContext, useEffect } from 'react';
import { commonPostHook } from './common.hook';
import { getMainResQueryDto } from '../model/main.dto';
import { MainContext } from '../context/main.context';
import { AuthContext } from '../context/auth.context';

export const hookMain = async (
    method: string,
    data: getMainResQueryDto | null = null,
    setMainRes: (res: any) => void
) => {
    if (method !== 'GET' && data === null) {
        return;
    }
    setMainRes({ type: 'LOADING' });
    console.log('hookMain called with method:', method);
    const url = 'https://108481f2624c.ngrok-free.app/main';
    const query = new URLSearchParams();
    if (method === 'GET'){
        if (data) {
            Object.entries(data as unknown as getMainResQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
        }
        const getUrl = url + '?' + query.toString();
        await commonPostHook(method, url, null, setMainRes, true );
    } else if (method === 'PATCH') {
        await commonPostHook(method, url, data, null );
    }
}