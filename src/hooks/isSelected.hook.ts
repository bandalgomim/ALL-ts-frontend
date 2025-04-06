import { commonPostHook } from './common.hook';
import { patchIsSelected, patchIsTeamSelected } from '../model/isSelected.dto';

export const hookIsSelected = async (
    method: string,
    data: patchIsSelected | null,
    setMainRes: (res: any) => void,
    setLogin: (login: any) => void
  ) => {

    const url = 'http://10.0.2.2:3000/isSelected';
    const query = new URLSearchParams();
    Object.entries(data as unknown as patchIsTeamSelected).forEach(([key, value]) => {
      if (value !== null) {query.append(key, String(value));}
    });
    const getUrl = `${url}?${query.toString()}`;
    setMainRes({ type: 'LOADING' });
    await commonPostHook(method, getUrl, null, setMainRes, setLogin);
  };
