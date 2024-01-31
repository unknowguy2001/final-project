import { User } from "./user";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  authInfo: AuthInfo;
  tokens?: Tokens;
}

export interface AuthInfo {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextValue {
  authInfo: AuthInfo;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>;
  isFetchingAuthInfo: boolean;
}
