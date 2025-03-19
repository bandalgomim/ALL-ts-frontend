import axios from 'axios';

export const commonPostHook = async (
    method: string,
    url: string,
    data: Object | null = null,
    dispatch: Function) => {
    try {
        const response = await axios({
            method: method,
            url: url,  // 올바른 URL 설정
            data: data ? data : {},  // POST, PUT, DELETE일 경우 payload
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iYWxsb2cuc3RvcmUiLCJzdWIiOiJwb3BpMTIwMSIsImlhdCI6MTczOTcwMjEwMiwiZXhwIjoxNzQ0ODg2MTAyfQ.QFoQmNK9eDE1-IXcUKIkmETZx0K-lbm5fkz7cPzuCaM',
              'Content-Type': 'application/json',
            },
          });
        let resultKeys = null;
        if (response.data.result) {resultKeys = Object.keys(response.data.result);}
        dispatch({ type: 'SUCCESS', payload: response.data.result, items: resultKeys});
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
            dispatch({ type: 'ERROR', payload: error.message + '!!' });
        } else {
            console.log('Error:', error);
            dispatch({ type: 'ERROR', payload: 'Unknown error occurred' });
        }
    }
};
