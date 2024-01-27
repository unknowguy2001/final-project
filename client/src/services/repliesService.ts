import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { create, get, remove, update } from "./baseService";
import { ReplyData, SearchRepliesResponse } from "../interfaces/reply";

export const searchReplies = async (
  forumId: string,
  config: AxiosRequestConfig
) => {
  return await get<SearchRepliesResponse>(
    `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}`,
    config
  );
};

export const createReply = async (
  forumId: string,
  data: ReplyData,
  config: AxiosRequestConfig = {}
) => {
  return await create(
    `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}`,
    data,
    config
  );
};

export const deleteReply = async (forumId: number, replyId: number) => {
  return await remove(
    `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}`,
    replyId
  );
};

export const updateReply = async (
  forumId: number,
  replyId: number,
  data: ReplyData
) => {
  return await update(
    `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}`,
    replyId,
    data
  );
};
