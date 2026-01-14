import { commonPostHook } from './common.hook';
import { getLeagueReqQueryDto } from '@model/league.dto';
import { domain } from '@/global';

export const hookLeague = async (
    method: string,
    data: getLeagueReqQueryDto | null = null,
    setLeagueRes: (res: any) => void
) => {
    setLeagueRes({ type: 'LOADING' });
    const url = `${domain}league`;
    const query = new URLSearchParams();
    Object.entries(data as unknown as getLeagueReqQueryDto).forEach(([key, value]) => {
        if (value !== null) {
            query.append(key, String(value));
        }
    });
    const getUrl = url + '?' + query.toString();
    await commonPostHook(method, getUrl, null, setLeagueRes);
    };

