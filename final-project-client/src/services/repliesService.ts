import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../axiosInstance";
import { ReplyData, SearchRepliesResponse } from "../interfaces/reply";

export const searchReplies = async (
  forumId: string,
  config: AxiosRequestConfig
) => {
  const url = `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}`;
  const response = await axiosInstance.get<SearchRepliesResponse>(url, config);
  return response;
};

export const createReply = async (
  forumId: string,
  data: ReplyData,
  config: AxiosRequestConfig = {}
) => {
  const url = `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}`;
  const response = await axiosInstance.post(url, data, config);
  return response;
};

export const deleteReply = async (forumId: number, replyId: number) => {
  const url = `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}/${replyId}`;
  const response = await axiosInstance.delete(url);
  return response;
};

export const updateReply = async (
  forumId: number,
  replyId: number,
  data: ReplyData
) => {
  const url = `${RESOURCES.FORUMS}/${forumId}${RESOURCES.REPLIES}/${replyId}`;
  const response = await axiosInstance.patch(url, data);
  return response;
};
