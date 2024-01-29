import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (token) => {
    setToken(token);
    Cookies.set("token", token, { expires: 365 });
  };

  const logout = () => {
    setToken(null);
    Cookies.remove("token");
  };

  const getData = () => {
    return {
      token,
      login,
      logout,
    };
  };

  return (
    <TokenContext.Provider value={getData()}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
