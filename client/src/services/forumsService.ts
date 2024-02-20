import { AxiosRequestConfig } from "axios";

import {
  ForumData,
  GetForumResponse,
  SearchForumsResponse,
} from "../interfaces/forum";
import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";

export const searchForums = (config: AxiosRequestConfig) => {
  return axiosInstance.get<SearchForumsResponse>(RESOURCES.FORUMS, config);
};

export const getForum = (forumId: string, config: AxiosRequestConfig) => {
  return axiosInstance.get<GetForumResponse>(
    `${RESOURCES.FORUMS}/${forumId}`,
    config
  );
};

export const createForum = (forumData: ForumData) => {
  return axiosInstance.post(RESOURCES.FORUMS, forumData);
};

export const deleteForum = (forumId: number) => {
  return axiosInstance.delete(`${RESOURCES.FORUMS}/${forumId}`);
};

export const updateForum = (forumId: string, forumData: ForumData) => {
  return axiosInstance.patch(`${RESOURCES.FORUMS}/${forumId}`, forumData);
};
