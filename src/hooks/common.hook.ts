import axios from 'axios';

export const commonPostHook = async (
    method: string,
    url: string,
    data: Object | null = null,
    dispatch: Function | null) => {
    try {
        const response = await axios({
            method: method,
            url: url,  // 올바른 URL 설정
            data: data ? data : {},  // POST, PUT, DELETE일 경우 payload
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iYWxsb2cuc3RvcmUiLCJzdWIiOiJwb3BpMTIwMSIsImlhdCI6MTc0MzYxMDU2OCwiZXhwIjoxNzQzNjEwNjI4fQ.V4dEICgS05h0XGzt-90KDOLqgB_DWvHJlYtbPRqSRVY',
              'Content-Type': 'application/json',
            },
          });
        let resultKeys = null;
        if (response.data.result) {resultKeys = Object.keys(response.data.result);}
        if (dispatch !== null) {
        dispatch({ type: 'SUCCESS', payload: response.data.result, items: resultKeys});}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('📌 응답 데이터:', error.response?.data);
            if (dispatch !== null) {
            dispatch({ type: 'ERROR', payload: error.message + '!!' });}
        } else {
            console.log('Error:', error);
            if (dispatch !== null) {
            dispatch({ type: 'ERROR', payload: 'Unknown error occurred' });}
        }
    }
};
