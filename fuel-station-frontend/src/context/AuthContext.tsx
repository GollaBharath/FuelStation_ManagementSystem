import { createContext } from "react";

export type UserRole = "admin" | "user" | null;

export interface AuthContextType {
  isLoggedIn: boolean;
  role: UserRole;
  login: (token: string) => void;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | null>(null);
