import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserDataProvider = ({ children }) => {
  const data = {
    name: "",
    surname: "",
    oib: "",
    sex: "",
    dateOfBirth: "",
    email: "",
    address: "",
    role: "",
    childrenOib: [],
  };
  const [userData, setUserData] = useState(data);

  const updateUserData = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const getData = () => {
    return {
      userData,
      updateUserData,
    };
  };

  return (
    <UserContext.Provider value={getData()}>{children}</UserContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserContext);
};
