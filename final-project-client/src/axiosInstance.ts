import axios from "axios";
import { toast } from "sonner";

import { hasMessageProperty } from "./utils/responseUtils";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    if (hasMessageProperty(response.data)) {
      toast.success(response.data.message);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }
    const { status, data } = error.response;
    if (status === 400) {
      toast.error(data.message);
    } else if (status === 401) {
      await instance.post("/auth/refresh");
      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
