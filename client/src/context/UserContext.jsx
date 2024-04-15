/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  // const [user, setUser] = useState(localStorage.getItem("user"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  function setUserDetail(newUser) {
    // setUser(newUser);
    setUserName(newUser.name);
    setRole(newUser.role);
    setUserId(newUser.id);
  }

  useEffect(() => {
    if (role && userName) {
      // localStorage.setItem("user", user);
      localStorage.setItem("userName", userName);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
    }
  }, [userName, role, userId]);

  const contextValue = {
    userName,
    role,
    userId,
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
