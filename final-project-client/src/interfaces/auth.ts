export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  setAuthInfo: React.Dispatch<React.SetStateAction<IAuthInfo>>;
  isFetchingAuthInfo: boolean;
}

export interface IAuthInfo {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IUser {
  username: string;
}
