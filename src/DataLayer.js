import React, { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext(); //esto prepara la DataLayer para el context api

export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);
export const useDataLayerValue = () => useContext(DataLayerContext); // aca usan un hook de react context que pasa la datalayer context a todos lados
