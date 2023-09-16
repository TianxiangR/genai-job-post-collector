import { log } from "../utils";


export const STATE_ACTIONS = {
  COLLECTOR_START: 'COLLECTOR_START',
  COLLECTOR_END: 'COLLECTOR_END'
};

export type State = {
  isCollecting: boolean;
}

export type StateAction = {
  type: string;
  value?: unknown;
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function stateReducer(state: State, action: StateAction): State{
  switch (action.type) {
  case STATE_ACTIONS.COLLECTOR_START:
    return {
      ...state,
      isCollecting: true,
    };

  case STATE_ACTIONS.COLLECTOR_END:
    return {
      ...state,
      isCollecting: false,
    };
  default:
    log('StateReducer - dispatched an unknown action');
    return state;
  }
}

export const initialState: State = {
  isCollecting: false
};

export default stateReducer;