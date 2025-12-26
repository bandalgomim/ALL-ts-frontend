import { commonPostHook } from './common.hook';
import { patchIcon } from '@model/Icon.dto';

export const hookIcon = async (
    method: string,
    data: patchIcon | null,
    setTypeRes: (res: any) => void
  ) => {
    setTypeRes({ type: 'LOADING' });
    const url = 'https://all-ts-backend-production.up.railway.app/icon';
    await commonPostHook(method, url, data, setTypeRes, true);
  };