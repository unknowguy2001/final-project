import { User } from "./user";

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthInfo {
  isAuthenticated: boolean;
  user: User | null;
}

export interface LoginResponse {
  authInfo: AuthInfo;
}
