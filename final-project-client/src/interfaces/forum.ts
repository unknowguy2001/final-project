import { Reply } from "./reply";

export interface Forum {
  id: number;
  createdByName: string;
  createdByUsername: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  replies: Reply[];
}

export interface SearchForumsResponse {
  items: Forum[];
  count: number;
}
