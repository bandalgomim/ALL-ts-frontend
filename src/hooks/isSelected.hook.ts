import { commonPostHook } from './common.hook';
import { patchIsSelected, patchIsTeamSelected } from '@model/isSelected.dto';
import { domain } from '@/global';

export const hookIsSelected = async (
    method: string,
    data: patchIsSelected | null,
    setMainRes: (res: any) => void
  ) => {
    setMainRes({ type: 'LOADING' });
    const url = `${domain}isSelected`;
    const query = new URLSearchParams();
    Object.entries(data as unknown as patchIsTeamSelected).forEach(([key, value]) => {
      if (value !== null) {query.append(key, String(value));}
    });
    const getUrl = `${url}?${query.toString()}`;
    await commonPostHook(method, getUrl, null, setMainRes, true);
  };
