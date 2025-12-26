import EncryptedStorage from 'react-native-encrypted-storage';

import { MMKV } from 'react-native-mmkv';

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
          } catch (error) {
            console.error('데이터 삭제 실패:', key, error);
          }
    },
};


// MMKV 인스턴스 생성 (앱 전체에서 하나만 생성)
export const storage = new MMKV();

export const localDataMmkv = {
  /**
   * 동기적으로 데이터 저장
   * @param key 저장할 키
   * @param value 문자열 값 (null이면 삭제)
   */
  set: (key: string, value: string | null = null) => {
    try {
      if (value === null) {
        storage.delete(key); // null이면 키 삭제
        return;
      }
      storage.set(key, value);
    } catch (error: any) {
      console.error('데이터 저장 실패:', key, error);
    }
  },

  /**
   * 동기적으로 데이터 읽기
   * @param key 가져올 키
   * @returns string 또는 null
   */
  get: (key: string): string | null => {
    try {
      const result = storage.getString(key);
      return result ?? null;
    } catch (error: any) {
      console.error('데이터 가져오기 실패:', key, error);
      return null;
    }
  },

  /**
   * 동기적으로 데이터 삭제
   * @param key 삭제할 키
   */
  delete: (key: string) => {
    try {
      storage.delete(key);
      // console.log('데이터 삭제 완료:', key);
    } catch (error: any) {
      console.error('데이터 삭제 실패:', key, error);
    }
  },
};

