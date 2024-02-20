import { Role } from "./role";

export interface User {
  id: number;
  username: string;
  fullname: string;
  role: Role;
  trainedCompany: {
    id: number;
    name: string;
  };
}

export interface SearchUsersResponse {
  items: User[];
  count: number;
}

export interface UserData {
  username: string;
  fullname: string;
  password: string;
  roleId: number | "";
  trainedCompanyId?: number | null;
}

export interface GetUserResponse {
  item: User;
}

export interface UpdateUserData {
  username: string;
  fullname: string;
  roleId: number | "";
  trainedCompanyId?: number | null;
}
