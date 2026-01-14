import { commonPostHook } from './common.hook';
import { getMainResQueryDto } from '@model/main.dto';
import { domain } from '@/global';

export const hookMain = async (
    method: string,
    data: getMainResQueryDto | null = null,
    setMainRes: (res: any) => void
) => {
    if (method !== 'GET' && data === null) {
        return;
    }
    console.log('요청');
    setMainRes({ type: 'LOADING' });
    const url = `${domain}main`;
    if (method === 'GET'){
        await commonPostHook(method, url, null, setMainRes );
    } else if (method === 'PATCH') {
        await commonPostHook(method, url, data, null );
    }
};
