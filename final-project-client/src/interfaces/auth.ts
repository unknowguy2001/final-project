export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthStatusResponse {
  isAuthenticated: boolean;
}
