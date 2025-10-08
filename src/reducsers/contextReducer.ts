export interface ContextState { contents: any }
export type ContextAction =
  | { type: 'SET'; payload?: any }
export function modalSingleReducer(
  state: ContextState,
  action: ContextAction
): ContextState {
  switch (action.type) {
    case 'SET': return { contents: action.payload ?? state.contents };
    default: return state;
  }
}