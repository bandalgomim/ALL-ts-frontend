import { commonPostHook } from './common.hook';

export const hookSearchTag = async (
    method: string,
    data: null,
    setSearchTagRes: (res: any) => void
  ) => {
    setSearchTagRes({ type: 'LOADING' });
    const url = 'https://all-ts-backend-production.up.railway.app/searchTag';
    await commonPostHook(method, url, data, setSearchTagRes, false);
  };
