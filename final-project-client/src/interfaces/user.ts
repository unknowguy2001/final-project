import { Role } from "./role";

export interface User {
  id: number;
  username: string;
  fullname: string;
  role: Role;
}

export interface SearchUsersResponse {
  items: User[];
  count: number;
}

export interface UserData {
  username: string;
  fullname: string;
  password: string;
  roleId: number;
}

export interface GetUserResponse {
  item: User;
}

export interface UpdateUserData {
  username: string;
  fullname: string;
  roleId: number;
}
