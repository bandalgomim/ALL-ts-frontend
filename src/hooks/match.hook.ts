import { commonPostHook } from './common.hook';
import { getMatchResQueryDto } from '@model/match.dto';
import { domain } from '@/global';

export const hookMatch = async (
    method: string,
    data: getMatchResQueryDto,
    setMatchRes: (res: any) => void
) => {
    setMatchRes({ type: 'LOADING' });
    const url = `${domain}match`;
    const query = new URLSearchParams();

    Object.entries(data as unknown as getMatchResQueryDto).forEach(([key, value]) => {
        if (value !== null) {
            query.append(key, String(value));
        }
    });
    const getUrl = url + '?' + query.toString();
    await commonPostHook(method, getUrl, null, setMatchRes);
};

// 기존 훅은 유지하되 내부에서 hookMatch 함수를 호출하도록 변경
