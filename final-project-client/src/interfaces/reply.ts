export interface Reply {
  id: number;
  createdByName: string;
  createdByUsername: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  forumId: number;
  childReplies: Reply[];
}

export interface SearchRepliesResponse {
  items: Reply[];
  count: number;
}

export interface ReplyData {
  description: string;
}
