import { commonPostHook } from './common.hook';
import { getMainResQueryDto } from '@model/main.dto';
import { getDeviceVersion } from '@utils/deviceVersion';

export const hookMain = async (
    method: string,
    data: getMainResQueryDto | null = null,
    setMainRes: (res: any) => void
) => {
    if (method !== 'GET' && data === null) {
        return;
    }
    const ver =await  getDeviceVersion()
    console.log("요청");
    setMainRes({ type: 'LOADING' });
    const url = 'https://all-ts-backend-production.up.railway.app/main';
    const query = new URLSearchParams();
    if (method === 'GET'){
        await commonPostHook(method, url, null, setMainRes );
    } else if (method === 'PATCH') {
        await commonPostHook(method, url, data, null );
    }
}