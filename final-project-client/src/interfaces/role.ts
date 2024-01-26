export interface Role {
  id: number;
  name: string;
  sequence: number;
}

export interface GetRolesResponse {
  items: Role[];
}
