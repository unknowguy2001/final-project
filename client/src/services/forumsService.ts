import { AxiosRequestConfig } from "axios";

import {
  ForumData,
  GetForumResponse,
  SearchForumsResponse,
} from "../interfaces/forum";
import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";

export const searchForums = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<SearchForumsResponse>(
    RESOURCES.FORUMS,
    config,
  );
};

export const getForum = async (forumId: string, config: AxiosRequestConfig) => {
  return await axiosInstance.get<GetForumResponse>(
    `${RESOURCES.FORUMS}/${forumId}`,
    config,
  );
};

export const createForum = async (data: ForumData) => {
  return await axiosInstance.post(RESOURCES.FORUMS, data);
};

export const deleteForum = async (forumId: number) => {
  return await axiosInstance.delete(`${RESOURCES.FORUMS}/${forumId}`);
};

export const updateForum = async (forumId: string, data: ForumData) => {
  return await axiosInstance.patch(`${RESOURCES.FORUMS}/${forumId}`, data);
};
