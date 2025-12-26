import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from 'react';
import { modalSingleReducer } from '@reducers/modalReducer';

// --- State & Actions 타입 ---
export interface SearchState {
  visible: boolean;
  contents: any; // 필요 시 제네릭으로 확장하세요: <T = any>
}

export interface SearchActions {
  open: () => void;   // 필요 시 제네릭으로 확장
  close: () => void;
}

// --- Context 생성 (초기값은 null, 훅에서 가드) ---
const SearchStateContext = createContext<SearchState | null>(null);
const SearchActionsContext = createContext<SearchActions | null>(null);

// --- Provider ---
export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    modalSingleReducer as React.Reducer<SearchState, any>,
    { visible: false, contents: null } as SearchState
  );

  const stateValue = useMemo<SearchState>(
    () => state,
    [state.visible, state.contents]
  );

  const actionsValue = useMemo<SearchActions>(
    () => ({
      open: () => dispatch({ type: 'OPEN', payload: null }),
      close: () => dispatch({ type: 'CLOSE' }),
    }),
    []
  );

  return (
    <SearchStateContext.Provider value={stateValue}>
      <SearchActionsContext.Provider value={actionsValue}>
        {children}
      </SearchActionsContext.Provider>
    </SearchStateContext.Provider>
  );
}

export const useSearchState = (): SearchState => {
  const ctx = useContext(SearchStateContext);
  if (!ctx) {throw new Error('useSearchState must be used within SearchProvider');}
  return ctx;
};

export const useSearchActions = (): SearchActions => {
  const ctx = useContext(SearchActionsContext);
  if (!ctx) {throw new Error('useSearchActions must be used within SearchProvider');}
  return ctx;
};
