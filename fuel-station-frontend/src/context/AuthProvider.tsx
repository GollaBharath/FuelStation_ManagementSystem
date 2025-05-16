import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type UserRole } from "./AuthContext";


interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(null);

  const decodeAndSetAuth = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role ?? "user");
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      logout();
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    decodeAndSetAuth(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      decodeAndSetAuth(token);
    }
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
