export interface Role {
  id: number;
  name: string;
}

export interface GetRolesResponse {
  items: Role[];
}
