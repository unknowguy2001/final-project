import { User } from "./user";

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthInfo {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
}

export interface LoginResponse {
  authInfo: AuthInfo;
  tokens?: Tokens;
}

export interface AuthContextValue {
  authInfo: AuthInfo;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>;
  isFetchingAuthInfo: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
