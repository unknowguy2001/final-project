import axios from "axios";
import { toast } from "sonner";

import { BASE_URL } from "./constants/api";
import { refresh } from "./services/authService";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (
      response.data !== null &&
      typeof response.data === "object" &&
      "message" in response.data
    ) {
      toast.success(response.data.message);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response) {
      const { status, data } = error.response;

      if (status === 400 || status === 500) {
        if (data.message === "Invalid refresh token") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
        toast.error(error.response.data.message);
      } else if (status === 401) {
        const response = await refresh();
        const { accessToken, refreshToken } = response.data.tokens;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
