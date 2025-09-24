import EncryptedStorage from 'react-native-encrypted-storage';

export const localData = {
    set: async (key: string, value: string | null = null) => {
        try {
            if (value === null) {
                await EncryptedStorage.removeItem(key); // null 저장 대신 삭제
                return;
            }
            await EncryptedStorage.setItem(key, value);
        } catch (error: any) {
            console.error('데이터 저장 실패:', key, error);
          }
    },
    get: async (key: string) => {
        try {
            const result = await EncryptedStorage.getItem(key);
            return result ? result : null;
        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
        }
    },
    delete: async (key: string) => {
        try {
            await EncryptedStorage.removeItem(key);
            console.log('데이터 삭제 완료');
          } catch (error) {

            console.error('데이터 삭제 실패:', key, error);
            
          }
    },
};
