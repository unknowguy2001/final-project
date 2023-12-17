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
