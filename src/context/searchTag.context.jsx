import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { PostReducer, initialsearchTagRes } from '../reducers/apiReducer';

// 1) 컨텍스트 두 개
const SearchTagStateContext = createContext(null);
const SearchTagActionsContext = createContext(null);

export function SearchTagProvider({ children }) {
  const [searchTagRes, dispatch] = useReducer(PostReducer, initialsearchTagRes);

  // 상태 컨텍스트: searchTagRes 바뀔 때만 갱신
  const stateValue = useMemo(() => searchTagRes, [searchTagRes]);

  // 액션 컨텍스트: 참조 고정 (dispatch는 React가 동일 참조 보장)
  const actionsValue = useMemo(
    () => ({
      setSearchTagRes: dispatch, // 그대로 노출하거나 래핑해도 됨
    }),
    []
  );

  return (
    <SearchTagStateContext.Provider value={stateValue}>
      <SearchTagActionsContext.Provider value={actionsValue}>
        {children}
      </SearchTagActionsContext.Provider>
    </SearchTagStateContext.Provider>
  );
}

// 훅
export const useSearchTagState = () => {
  const ctx = useContext(SearchTagStateContext);
  if (!ctx) {throw new Error('useSearchTagState must be used within SearchTagProvider');}
  return ctx;
};

export const useSearchTagActions = () => {
  const ctx = useContext(SearchTagActionsContext);
  if (!ctx) {throw new Error('useSearchTagActions must be used within SearchTagProvider');}
  return ctx;
};
