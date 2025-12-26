import axios from 'axios';
import { localData } from '@IAM/localData';

export const commonPostHook = async (
    method: string,
    url: string,
    data: Object | null = null,
    dispatch: Function | null,
) => {
    const authToken = await localData.get('Authorization');
    const refreshToken = await localData.get('RefreshToken');
    const req = {
        method,
        url,
        headers: {
          'Authorization': authToken ?? '',
          'RefreshToken': refreshToken ?? '',
          'Content-Type': 'application/json',
        },
        ...(data && { data }), // ⬅️ data가 있을 때만 포함
      };
    try {
        const response = await axios(req);
        if (!response.headers.authorization) {
            let resultKeys = null;
            if (response.data.result) {resultKeys = Object.keys(response.data.result);}
            if (dispatch !== null) {
            dispatch({ type: 'SUCCESS', payload: response.data.result, items: resultKeys});}
        } else {
            await localData.set('Authorization', response.headers.authorization);
            await commonPostHook(method, url, data, dispatch);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.includes('refresh token unmatched')) {
                await localData.delete('Authorization');
                await localData.delete('RefreshToken');
            }
            if (dispatch !== null) {
            dispatch({ type: 'ERROR', payload: error.message + '!!' });}
        } else {
            console.log('Error:', error);
            if (dispatch !== null) {
            dispatch({ type: 'ERROR', payload: 'Unknown error occurred' });}
        }
    }
};
