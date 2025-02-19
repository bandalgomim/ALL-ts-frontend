import { Dispatch } from 'react';
import { getMyPageRes } from './myPage.dto';
import { contextPostListDto, getPostDto } from './post.dto';
import { homeDto } from './home.dto';

// 상태 타입 정의
export interface PostState<T> {
    data: T | Record<string, unknown> | null;
    loading: boolean;
    error: string | null;
  }

  // 액션 타입 정의
export type PostAction<P> =
    | { type: 'LOADING' }
    | { type: 'SUCCESS'; payload: P; items: string[] | null}
    | { type: 'ERROR'; payload: string };





export interface ContextDto {
    myPage: PostState<getMyPageRes>,
    setMyPage: Dispatch<PostAction<getMyPageRes>>,

    post: PostState<getPostDto>;
    setPost: Dispatch<PostAction<getPostDto>>,

    postList: PostState<contextPostListDto>,
    setPostList: Dispatch<PostAction<contextPostListDto>>

    home: PostState<homeDto>,
    setHome: Dispatch<PostAction<homeDto>>
}
