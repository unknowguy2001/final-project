export interface Hashtag {
  id: number;
  name: string;
}

export interface GetHashtagsResponse {
  items: Hashtag[];
}
