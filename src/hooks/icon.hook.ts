import { commonPostHook } from './common.hook';
import { patchIcon } from '../model/Icon.dto';

export const hookIcon = async (
    method: string,
    data: patchIcon | null,
    setTypeRes: (res: any) => void
  ) => {
    setTypeRes({ type: 'LOADING' });
    const url = 'https://cc2ffc638600.ngrok-free.app/icon';
    await commonPostHook(method, url, data, setTypeRes, true);
  };