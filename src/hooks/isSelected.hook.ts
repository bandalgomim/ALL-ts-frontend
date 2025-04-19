import { commonPostHook } from './common.hook';
import { patchIsSelected, patchIsTeamSelected } from '../model/isSelected.dto';

export const hookIsSelected = async (
    method: string,
    data: patchIsSelected | null,
    setMainRes: (res: any) => void,
    setLogin: (login: any) => void
  ) => {
    setMainRes({ type: 'LOADING' });
    const url = 'https://all-ts-backend-production.up.railway.app/isSelected';
    const query = new URLSearchParams();
    Object.entries(data as unknown as patchIsTeamSelected).forEach(([key, value]) => {
      if (value !== null) {query.append(key, String(value));}
    });
    const getUrl = `${url}?${query.toString()}`;
    await commonPostHook(method, getUrl, null, setMainRes, setLogin);
  };
