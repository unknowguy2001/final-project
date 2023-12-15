import axios from "axios";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
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

    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    if (error.response) {
      if (error.response.status === 400) {
        if (error.response.data.message === "Invalid refresh token") {
          return await axiosInstance.post("/auth/logout");
        }
        toast.error(error.response.data.message);
      } else if (error.response.status === 401) {
        await axiosInstance.post("/auth/refresh");
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
