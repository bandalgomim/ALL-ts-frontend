import { useEffect } from 'react';
import { postSignUpReqDto } from '../model/IAM.dto';
import axios from 'axios';
import { localData } from '../IAM/localData';

export const useSignUp = (method: string, data: postSignUpReqDto | null = null) => {
    useEffect(() => {
        if (data === null) {
            return;
        }
        const url = 'http://10.0.2.2:3000/auth/IAM/signUp';
        const fetchMyPage = async () => {
            if (method === 'POST'){
                await commonIAMHook(method, url, data);
            }
        };
        fetchMyPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
};

export const commonIAMHook = async (
    method: string,
    url: string,
    data: Object | null = null) => {
    try {
        const authToken = await localData.get('Authorization');
        const refreshToken = await localData.get('RefreshToken');
        const response = await axios({
            method: method,
            url: url,  // 올바른 URL 설정
            data: data ? data : {},  // POST, PUT, DELETE일 경우 payload
            headers: {
                'Authorization': authToken ? authToken : '',
                'RefreshToken': refreshToken ? refreshToken : '',
                'Content-Type': 'application/json',
            },
          });
          console.log(response.headers);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('📌 응답 데이터:', error.response?.data);

        } else {
            console.log('Error:', error);

        }
    }
};
