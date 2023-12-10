import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "../axiosInstance";
import {
  ForumData,
  GetForumResponse,
  SearchForumsResponse,
} from "../interfaces/forum";

export const searchForums = async (config: AxiosRequestConfig) => {
  const url = "/forums";
  const response = await axiosInstance.get<SearchForumsResponse>(url, config);
  return response;
};

export const getForum = async (forumId: string, config: AxiosRequestConfig) => {
  const url = `/forums/${forumId}`;
  const response = await axiosInstance.get<GetForumResponse>(url, config);
  return response;
};

export const createForum = async (data: ForumData) => {
  const url = `/forums`;
  const response = await axiosInstance.post(url, data);
  return response;
};
