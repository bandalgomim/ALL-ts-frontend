import { commonPostHook } from './common.hook';

export const hookSearchTag = async (
    method: string,
    data: null,
    setSearchTagRes: (res: any) => void
  ) => {
    setSearchTagRes({ type: 'LOADING' });
    const url = 'https://108481f2624c.ngrok-free.app/searchTag';
    await commonPostHook(method, url, data, setSearchTagRes, false);
  };