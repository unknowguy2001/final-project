import { AxiosRequestConfig } from "axios";

import {
  ForumData,
  GetForumResponse,
  SearchForumsResponse,
} from "../interfaces/forum";
import { RESOURCES } from "../constants/api";
import { create, get, remove, update } from "./baseService";

export const searchForums = async (config: AxiosRequestConfig) => {
  return await get<SearchForumsResponse>(RESOURCES.FORUMS, config);
};

export const getForum = async (forumId: string, config: AxiosRequestConfig) => {
  return await get<GetForumResponse>(`${RESOURCES.FORUMS}/${forumId}`, config);
};

export const createForum = async (data: ForumData) => {
  return await create(RESOURCES.FORUMS, data);
};

export const deleteForum = async (forumId: number) => {
  return await remove(RESOURCES.FORUMS, forumId);
};

export const updateForum = async (forumId: string, data: ForumData) => {
  return await update(RESOURCES.FORUMS, forumId, data);
};
