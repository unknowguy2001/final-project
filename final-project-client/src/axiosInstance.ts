import axios from "axios";
import { toast } from "sonner";

import { BASE_URL } from "./constants/api";
import { logout, refresh } from "./services/authService";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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
          await logout();
        }
        toast.error(error.response.data.message);
      } else if (status === 401) {
        await refresh();
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
