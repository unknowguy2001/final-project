import axios from "axios";
import { toast } from "sonner";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const { status, data } = error.response;
    if (status === 400) {
      toast.error(data.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
