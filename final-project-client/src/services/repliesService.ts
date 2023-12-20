import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";
import { ReplyData, SearchRepliesResponse } from "../interfaces/reply";

export const searchReplies = async (
  forumId: string,
  config: AxiosRequestConfig
) => {
  const url = `/forums/${forumId}/replies`;
  const response = await axiosInstance.get<SearchRepliesResponse>(url, config);
  return response;
};

export const createReply = async (
  forumId: string,
  data: ReplyData,
  config: AxiosRequestConfig = {}
) => {
  const url = `/forums/${forumId}/replies`;
  const response = await axiosInstance.post(url, data, config);
  return response;
};

export const deleteReply = async (forumId: number, replyId: number) => {
  const url = `/forums/${forumId}/replies/${replyId}`;
  const response = await axiosInstance.delete(url);
  return response;
};

export const updateReply = async (
  forumId: number,
  replyId: number,
  data: ReplyData
) => {
  const url = `/forums/${forumId}/replies/${replyId}`;
  const response = await axiosInstance.patch(url, data);
  return response;
};
