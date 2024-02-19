import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";
import { ReplyData, SearchRepliesResponse } from "../interfaces/reply";

export const searchReplies = async (
  forumId: string,
  config: AxiosRequestConfig,
) => {
  return await axiosInstance.get<SearchRepliesResponse>(
    `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}`,
    config,
  );
};

export const createReply = async (
  forumId: string,
  data: ReplyData,
  config: AxiosRequestConfig = {},
) => {
  return await axiosInstance.post(
    `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}`,
    data,
    config,
  );
};

export const deleteReply = async (forumId: number, replyId: number) => {
  return await axiosInstance.delete(
    `${RESOURCES.FORUMS}/${forumId}/${RESOURCES.REPLIES}/${replyId}`,
  );
};

export const updateReply = async (
  forumId: number,
  replyId: number,
  data: ReplyData,
) => {
  return await axiosInstance.patch(
    `${RESOURCES.FORUMS}/${forumId}/${RESOURCES.REPLIES}/${replyId}`,
    data,
  );
};
