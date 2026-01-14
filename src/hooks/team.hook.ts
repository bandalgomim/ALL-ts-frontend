import { commonPostHook } from './common.hook';
import { getTeamReqQueryDto } from '@model/team.dto';
import { domain } from '@/global';

export const hookTeam = async (
    method: string,
    data: getTeamReqQueryDto | null = null,
    setTeamRes: (res: any) => void
  ) => {
    setTeamRes({ type: 'LOADING' });
    const url = `${domain}team`;
    console.log(url);
    const query = new URLSearchParams();
    Object.entries(data as unknown as getTeamReqQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
    const getUrl = url + '?' + query.toString();
    await commonPostHook(method, getUrl, null, setTeamRes );
};
