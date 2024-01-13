import React, { createContext, useReducer, useContext } from "react";
//  which will be used to share state across components
// creating new context named StateContext
const StateContext = createContext();
// Create a custom hook 'useStateValue' that can be used by components to easily access the state and dispatch
export const useStateValue = () => useContext(StateContext);

// Create a component 'StateProvider' that sets up the context provider with state and dispatch from useReducer

// defining cutstom componet
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};
