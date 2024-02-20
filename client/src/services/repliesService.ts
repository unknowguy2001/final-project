import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";
import { ReplyData, SearchRepliesResponse } from "../interfaces/reply";

export const searchReplies = (forumId: string, config: AxiosRequestConfig) => {
  return axiosInstance.get<SearchRepliesResponse>(
    `${RESOURCES.FORUMS}/${forumId}/${RESOURCES.REPLIES}`,
    config
  );
};

export const createReply = (
  forumId: string,
  replyData: ReplyData,
  config: AxiosRequestConfig = {}
) => {
  return axiosInstance.post(
    `${RESOURCES.FORUMS}/${forumId}/${RESOURCES.REPLIES}`,
    replyData,
    config
  );
};

export const deleteReply = (forumId: number, replyId: number) => {
  return axiosInstance.delete(
    `${RESOURCES.FORUMS}/${forumId}/${RESOURCES.REPLIES}/${replyId}`
  );
};

export const updateReply = (
  forumId: number,
  replyId: number,
  replydata: ReplyData
) => {
  return axiosInstance.patch(
    `${RESOURCES.FORUMS}/${forumId}/${RESOURCES.REPLIES}/${replyId}`,
    replydata
  );
};
