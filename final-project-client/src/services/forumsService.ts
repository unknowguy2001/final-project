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

export const deleteForum = async (forumId: number) => {
  const url = `/forums/${forumId}`;
  const response = await axiosInstance.delete(url);
  return response;
};

export const updateForum = async (forumId: string, data: ForumData) => {
  const url = `/forums/${forumId}`;
  const response = await axiosInstance.patch(url, data);
  return response;
};
