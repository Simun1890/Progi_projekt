import React, { createContext, useContext, useState } from "react";

const GlobalErrorContext = createContext();

export const GlobalErrorProvider = ({ children }) => {
  const [globalError, setGlobalError] = useState(false);

  const getData = () => {
    return {
      globalError,
      setGlobalError,
    };
  };

  return (
    <GlobalErrorContext.Provider value={getData()}>
      {children}
    </GlobalErrorContext.Provider>
  );
};

export const useGlobalError = () => {
  return useContext(GlobalErrorContext);
};
