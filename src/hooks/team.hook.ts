import { commonPostHook } from './common.hook';
import { getTeamReqQueryDto } from '../model/team.dto';

export const hookTeam = async (
    method: string,
    data: getTeamReqQueryDto | null = null,
    setTeamRes: (res: any) => void
  ) => {
    setTeamRes({ type: 'LOADING' });
    const url = 'https://108481f2624c.ngrok-free.app/team';
    const query = new URLSearchParams();
    Object.entries(data as unknown as getTeamReqQueryDto).forEach(([key, value]) => {if(value !== null){query.append(key, String(value));}});
    const getUrl = url + '?' + query.toString();
    await commonPostHook(method, getUrl, null, setTeamRes );
}