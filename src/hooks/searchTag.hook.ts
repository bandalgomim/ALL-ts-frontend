import { commonPostHook } from './common.hook';
import { domain } from '@/global';

export const hookSearchTag = async (
    method: string,
    data: null,
    setSearchTagRes: (res: any) => void
  ) => {
    setSearchTagRes({ type: 'LOADING' });
    const url = `${domain}searchTag`;
    await commonPostHook(method, url, data, setSearchTagRes, false);
  };
