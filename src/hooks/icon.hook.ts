import { commonPostHook } from './common.hook';
import { patchIcon } from '@model/Icon.dto';
import { domain } from '@/global';

export const hookIcon = async (
    method: string,
    data: patchIcon | null,
    setTypeRes: (res: any) => void
  ) => {
    setTypeRes({ type: 'LOADING' });
    const url = `${domain}icon`;
    await commonPostHook(method, url, data, setTypeRes, true);
  };
