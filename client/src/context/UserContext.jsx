/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  function setUserDetail(newUser) {
    setUser(newUser);
  }

  // const contextValue = useMemo(
  //   () => ({
  //     user,
  //     setUserDetail,
  //   }),
  //   [user]
  // );

  const contextValue = {
    user,
    setUserDetail,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
