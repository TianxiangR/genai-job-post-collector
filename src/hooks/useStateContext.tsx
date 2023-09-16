import React, { createContext, Dispatch, useContext, useReducer } from "react";

import stateReducer, { initialState,State, StateAction } from "../reducers/stateReducer";

// Prepares the dataLayer
export const StateContext = createContext<[State, Dispatch<StateAction>]>([
  initialState,
  () => undefined
]);

/**
 * Wrap our app and provide the Data layer
 * @param param0 
 * @returns 
 */
export function StateProvider({children }: {children: React.ReactNode}){
  return <StateContext.Provider value={useReducer(stateReducer, initialState)}>
    {children}
  </StateContext.Provider>;
}

/**
 * Pull information from the data layer
 * @returns 
 */
export const useStateContext = () => useContext(StateContext);