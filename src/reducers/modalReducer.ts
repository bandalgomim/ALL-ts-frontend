export interface SingleModalState { visible: boolean; contents: any }
export type SingleModalAction =
  | { type: 'OPEN'; payload?: any }
  | { type: 'CLOSE' };

export function modalSingleReducer(
  state: SingleModalState,
  action: SingleModalAction
): SingleModalState {
  switch (action.type) {
    case 'OPEN': return { visible: true, contents: action.payload ?? state.contents };
    case 'CLOSE': return { ...state, visible: false };
    default: return state;
  }
}
