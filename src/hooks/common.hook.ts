import axios from 'axios';
import { localData } from '../IAM/localData';

export const commonPostHook = async (
    method: string,
    url: string,
    data: Object | null = null,
    dispatch: Function | null,
    loginState: Function) => {
    try {
        const authToken = await localData.get('Authorization');
        const refreshToken = await localData.get('RefreshToken');
        const response = await axios({
            method: method,
            url: url,  // 올바른 URL 설정
            data: data ? data : {},  // POST, PUT, DELETE일 경우 payload
            headers: {
              'Authorization': authToken,
              'RefreshToken': refreshToken,
              'Content-Type': 'application/json',
            },
          });
        if (!response.headers.authorization) {
            let resultKeys = null;
            if (response.data.result) {resultKeys = Object.keys(response.data.result);}
            if (dispatch !== null) {
            dispatch({ type: 'SUCCESS', payload: response.data.result, items: resultKeys});}
        } else {
            await localData.set('Authorization', response.headers.authorization);
            await commonPostHook(method, url, data, dispatch, loginState);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.includes('refresh token unmatched')) {
                loginState(false);
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
