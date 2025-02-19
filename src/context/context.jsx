import React, { createContext, useReducer } from "react";
import { PostReducer, initialPost, initialPostList, initialMyPage, initialHome } from "../reducsers/apiReducer";

export const ApiContext = createContext();


export function ApiProvider({ children }) {
  const [myPage, setMyPage] = useReducer(PostReducer, initialMyPage);
  const [post, setPost] = useReducer(PostReducer, initialPost);
  const [postList, setPostList] = useReducer(PostReducer, initialPostList);
  const [home, setHome] = useReducer(PostReducer, initialHome);
  const [postLike, setPostLike] = useReducer(PostReducer, initialPost);
  const [comment, setComment] = useReducer(PostReducer, initialPost);
  return (
    <ApiContext.Provider value={{
      myPage,
      setMyPage,
      post,
      setPost,
      postList,
      setPostList,
      home,
      setHome,
      postLike,
      setPostLike,
      comment,
      setComment}}>
      {children}
    </ApiContext.Provider>
  );
}
