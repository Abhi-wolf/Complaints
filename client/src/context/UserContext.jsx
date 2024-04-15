/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(localStorage.getItem("user"));

  function setUserDetail(newUser) {
    setUser(newUser);
    setUserName(newUser.name);
    setRole(newUser.role);
  }

  useEffect(() => {
    if (user && userName) {
      localStorage.setItem("user", user);
      localStorage.setItem("userName", userName);
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
    }
  }, [user, userName, role]);

  const contextValue = {
    user,
    userName,
    role,
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
