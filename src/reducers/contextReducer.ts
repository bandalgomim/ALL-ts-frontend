export interface ContextState { res: any }
export type ContextAction =
  | { type: 'SET'; payload?: any }
export function contextReducer(
  state: ContextState,
  action: ContextAction
): ContextState {
  switch (action.type) {
    case 'SET': return { res: action.payload ?? state.res };
    default: return state;
  }
}