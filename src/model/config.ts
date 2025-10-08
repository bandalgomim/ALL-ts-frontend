// 상태 타입 정의
export interface PostState<T> {
    data: T;
    loading: boolean;
    error: string | null;
  }

  // 액션 타입 정의
export type PostAction<P> =
    | { type: 'LOADING' }
    | { type: 'SUCCESS'; payload: P; items: string[] | null}
    | { type: 'ERROR'; payload: string };

// 기본 rest api 타입 정의

export interface StateDto<T> {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    data: T | null
}
